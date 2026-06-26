import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '..', 'src', 'data');
const imageDir = path.resolve(__dirname, '..', 'public', 'images', 'cardapio');

const URL = 'https://lasaborepizzaria.menudino.com/';

async function scrape() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // Store all API responses
  const apiData = { categories: null, itemsByCategory: {} };

  page.on('response', async (response) => {
    const url = response.url();
    try {
      const ct = response.headers()['content-type'] || '';
      if (ct.includes('json') && url.includes('menudino')) {
        const json = await response.json();
        if (url.includes('/categories') || url.includes('/items')) {
          console.log(`  API: ${url.substring(0, 100)}...`);
          if (Array.isArray(json)) {
            apiData.categories = json;
          }
        }
      }
    } catch (e) {}
  });

  console.log('Loading page...');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Get merchant info
  const merchantInfo = await page.evaluate(() => {
    const nameEl = document.querySelector('h1');
    return { name: nameEl?.textContent?.trim() || '' };
  });
  console.log(`Merchant: ${merchantInfo.name}`);

  // Scroll down to trigger lazy loading of all categories
  console.log('Scrolling to load all categories...');
  for (let i = 0; i < 30; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, 400);
    });
    await page.waitForTimeout(800);
  }

  // Go back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // Now try to extract all category titles from the page
  const categoryInfo = await page.evaluate(() => {
    const heads = document.querySelectorAll('[class*="headTitle"], h2');
    const cats = [];
    heads.forEach(h => {
      const text = h.textContent?.trim();
      if (text && text.length > 1 && text.length < 80) {
        cats.push(text);
      }
    });
    return [...new Set(cats)];
  });
  console.log(`Found categories: ${categoryInfo.join(', ')}`);

  // Click on all category headers to expand them
  const categoryData = await page.evaluate(() => {
    const headers = document.querySelectorAll('[class*="headTitle"], [class*="head-title"]');
    const results = [];
    headers.forEach((header, idx) => {
      const titleEl = header.querySelector('h2, span, [class*="title"]');
      const title = titleEl?.textContent?.trim() || `Category ${idx}`;
      
      // Try clicking to expand
      if (header) header.click();
      
      results.push({ title });
    });
    return results;
  });

  // Wait for API calls to resolve
  await page.waitForTimeout(5000);

  // Now scroll to each section to trigger more item loading
  const sections = await page.$$('[class*="contentCategories"], .content-categories, [class*="headTitle"]');
  console.log(`Found ${sections.length} section elements`);

  for (let i = 0; i < sections.length; i++) {
    try {
      await sections[i].scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      
      // Try clicking header to expand
      const header = await sections[i].$('[class*="headTitle"], [class*="head-title"]');
      if (header) {
        await header.click();
        await page.waitForTimeout(2000);
      }
    } catch (e) {}
  }

  // Final wait for all API calls
  await page.waitForTimeout(5000);

  // Extract all product data from the DOM
  const extracted = await page.evaluate(() => {
    // Get all category sections
    const contentSections = document.querySelectorAll('[class*="contentCategories"], .content-categories');
    const cats = [];
    
    contentSections.forEach((section) => {
      const titleEl = section.querySelector('h2');
      const title = titleEl?.textContent?.trim() || '';
      
      // Get all product cards in this section
      const cards = section.querySelectorAll('[class*="card"]');
      const items = [];
      
      cards.forEach(card => {
        const nameEl = card.querySelector('[data-testid="product-card-title"], h5, [class*="title"]');
        const descEl = card.querySelector('p[class*="description"]');
        const priceEl = card.querySelector('b, [class*="price"]');
        const imgEl = card.querySelector('img');
        
        const name = nameEl?.textContent?.trim() || '';
        const desc = descEl?.textContent?.trim() || '';
        const price = priceEl?.textContent?.trim() || '';
        const imgSrc = imgEl?.getAttribute('src') || '';
        
        if (name) {
          items.push({
            name,
            description: desc,
            price: price.replace(/\s+/g, ' ').trim(),
            image: imgSrc.startsWith('//') ? 'https:' + imgSrc : imgSrc,
          });
        }
      });
      
      if (title && items.length > 0) {
        cats.push({ title, items });
      }
    });
    
    // If no sections found with the above method, try a broader approach
    if (cats.length === 0) {
      // Look for any heading that looks like a category
      document.querySelectorAll('section').forEach(section => {
        const titleEl = section.querySelector('h2');
        const title = titleEl?.textContent?.trim() || '';
        const cards = section.querySelectorAll('[class*="card"]');
        const items = [];
        
        cards.forEach(card => {
          const nameEl = card.querySelector('[data-testid="product-card-title"], h5');
          const priceEl = card.querySelector('b');
          const imgEl = card.querySelector('img');
          
          const name = nameEl?.textContent?.trim() || '';
          if (name) {
            items.push({
              name,
              price: priceEl?.textContent?.trim()?.replace(/\s+/g, ' ').trim() || '',
              image: imgEl?.getAttribute('src')?.startsWith('//') 
                ? 'https:' + imgEl.getAttribute('src') 
                : imgEl?.getAttribute('src') || '',
            });
          }
        });
        
        if (title && items.length > 0) {
          cats.push({ title, items });
        }
      });
    }
    
    return cats;
  });

  console.log(`\nExtracted ${extracted.length} categories:`);
  extracted.forEach((cat, i) => {
    console.log(`  ${i + 1}. ${cat.title} (${cat.items.length} items)`);
    cat.items.forEach(item => {
      console.log(`     - ${item.name} | ${item.price}`);
    });
  });

  await browser.close();

  // Save output
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'cardapio.json');
  
  const result = {
    merchant: merchantInfo,
    scrapedAt: new Date().toISOString(),
    source: URL,
    categories: extracted,
    rawApiResponses: apiData,
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`\nSaved catalog to ${outputPath}`);
  
  return result;
}

scrape().catch(err => {
  console.error('Scrape failed:', err);
  process.exit(1);
});
