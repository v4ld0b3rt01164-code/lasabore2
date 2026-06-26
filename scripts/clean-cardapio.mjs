import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');
const imageDir = path.resolve(__dirname, '..', 'public', 'images', 'cardapio');

function extractFilename(imgUrl) {
  const idx = imgUrl.lastIndexOf('/');
  return idx >= 0 ? imgUrl.substring(idx + 1) : imgUrl;
}

function cleanData(rawJSON) {
  const categories = rawJSON.categories.map(cat => {
    const seen = new Set();
    const uniqueItems = cat.items.filter(item => {
      const key = item.name.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { ...cat, items: uniqueItems };
  });
  return { ...rawJSON, categories };
}

async function downloadImages(categories) {
  const imageMap = {};

  for (const cat of categories) {
    for (const item of cat.items) {
      const imgUrl = item.image;
      if (!imgUrl || imgUrl.includes('product_not_found')) continue;
      const filename = extractFilename(imgUrl);
      if (!imageMap[imgUrl]) {
        imageMap[imgUrl] = filename;
      }
    }
  }

  const urls = Object.keys(imageMap);
  console.log(`Downloading ${urls.length} images...`);
  fs.mkdirSync(imageDir, { recursive: true });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = imageMap[url];
    const filepath = path.join(imageDir, filename);

    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 0) {
      console.log(`  [${i+1}/${urls.length}] SKIP (exists): ${filename}`);
      continue;
    }

    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const buffer = Buffer.from(await resp.arrayBuffer());
        fs.writeFileSync(filepath, buffer);
        console.log(`  [${i+1}/${urls.length}] OK: ${filename} (${(buffer.length / 1024).toFixed(0)}KB)`);
      } else {
        console.log(`  [${i+1}/${urls.length}] FAIL (${resp.status}): ${url.substring(0, 80)}`);
      }
    } catch (e) {
      console.log(`  [${i+1}/${urls.length}] ERROR: ${e.message}`);
    }
  }
}

async function main() {
  const rawPath = path.join(dataDir, 'cardapio.json');
  if (!fs.existsSync(rawPath)) {
    console.error('Run scrape-cardapio.mjs first!');
    process.exit(1);
  }
  const rawJSON = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));

  console.log('=== Cleaning data ===');
  const cleaned = cleanData(rawJSON);

  const totalBefore = rawJSON.categories.reduce((s, c) => s + c.items.length, 0);
  const totalAfter = cleaned.categories.reduce((s, c) => s + c.items.length, 0);
  console.log(`Deduplicated: ${totalBefore} → ${totalAfter} items (removed ${totalBefore - totalAfter} duplicates)`);
  cleaned.categories.forEach(cat => {
    console.log(`  ${cat.title}: ${cat.items.length} items`);
  });

  console.log('\n=== Downloading images ===');
  await downloadImages(cleaned.categories);

  // Build output with local paths
  const publicPath = '/images/cardapio/';
  const updated = {
    merchant: cleaned.merchant,
    scrapedAt: cleaned.scrapedAt,
    source: cleaned.source,
    categories: cleaned.categories.map(cat => ({
      ...cat,
      items: cat.items.map(item => {
        const url = item.image;
        if (!url || url.includes('product_not_found')) {
          return { ...item, image: null };
        }
        const filename = extractFilename(url);
        return { ...item, image: publicPath + filename, imageOriginal: url };
      })
    }))
  };

  const cleanPath = path.join(dataDir, 'cardapio-limpo.json');
  fs.writeFileSync(cleanPath, JSON.stringify(updated, null, 2), 'utf-8');

  // Also count items with/without images
  let withImg = 0, withoutImg = 0;
  for (const cat of updated.categories) {
    for (const item of cat.items) {
      if (item.image) withImg++; else withoutImg++;
    }
  }
  console.log(`\n=== Done ===`);
  console.log(`Items with images: ${withImg}, without: ${withoutImg}`);
  console.log(`Saved to ${cleanPath}`);
}

main().catch(console.error);
