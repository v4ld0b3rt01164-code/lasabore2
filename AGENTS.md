# La Sabore — Pizzaria Site

## Stack
- **Framework:** React 19 + Vite 8
- **Language:** TypeScript 6 (strict)
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Animation:** framer-motion 12
- **Icons:** lucide-react 21
- **Font:** Inter (Google Fonts) — weights 400, 500, 600, 700
- **Deploy:** Cloudflare Pages (`npm run build` → dist/)

## Project Structure
```
lasabore-site/
├── index.html              ← SEO meta tags, OG, theme-color, favicon (emoji)
├── vite.config.ts          ← Vite + React + Tailwind plugins
├── tsconfig.json
├── package.json
├── AGENTS.md
├── opencode.json           ← Config do Opencode (agente vision)
├── captura.png             ← Screenshot do site
├── .opencode/
│   └── agents/
│       └── vision.md       ← Agente com google/gemini-2.5-flash (visão)
├── public/
│   ├── _redirects          ← SPA fallback: /* /index.html 200
│   └── images/cardapio/    ← 51 imagens: MenuDino (400×400) + Unsplash (800×800)
└── src/
    ├── main.tsx
    ├── index.css           ← Tailwind + custom utilities + scroll-padding
    ├── App.tsx             ← Root layout (Nav > main > Footer)
    ├── data/
    │   └── cardapio-limpo.json  ← 66 itens, 4 categorias, paths locais
    └── components/
        ├── Navbar.tsx      ← h-16, sticky glass, mobile scroll-lock
        ├── Hero.tsx        ← 100vh, Unsplash bg, gradient overlay
        ├── Destaques.tsx   ← 3 glass cards grid
        ├── Cardapio.tsx    ← Tabs topo+fim, grid 1/2/3, emoji fallback
        ├── Entrega.tsx     ← Cards + horários CTA box
        ├── Sobre.tsx       ← Split 50/50, highlights em vermelho
        ├── CtaFinal.tsx    ← Gradiente vermelho, botões duais
        └── Footer.tsx      ← 4 colunas, social icons SVG
```

## Design System

### Colors
| Token | Hex | Uso |
|-------|-----|-----|
| Background | `#0a0a0a` | Fundo principal (seções ímpares) |
| Background alt | `#0d0d0d` | Fundo alternado (seções pares, com border-t) |
| Text | `#ffffff` | Títulos e texto principal |
| Text secondary | `rgba(255,255,255,0.55)` | Descrições, parágrafos |
| Text muted | `rgba(255,255,255,0.45)` | Labels, links no footer |
| Accent | `#dc2626` | Vermelho — CTAs, destaques, stats |
| Accent hover | `#b91c1c` | Hover dos botões |
| Surface | `rgba(26,26,26,0.5)` | Fundo dos glass cards |
| Border | `rgba(255,255,255,0.07)` | Borda sutil dos cards |
| Section divider | `rgba(255,255,255,0.03)` | border-t entre seções alternadas |
| Gradient CTA | `from-[#dc2626] to-[#991b1b]` | Fundo do CTA final |

### Typography
| Nível | Classe | Tamanho |
|-------|--------|---------|
| Hero title | `text-4xl sm:5xl md:6xl lg:7xl` | Fluido |
| Section h2 | `text-3xl sm:text-4xl` | Fluido |
| Card title | `text-lg font-semibold` | 18px |
| Body text | `text-base` | 16px |
| Card desc | `text-sm` | 14px |
| Section tag | `text-xs uppercase tracking-[0.12em]` | 12px |

### Spacing
- **Section padding:** `py-24 sm:py-28` (96px/112px)
- **Container:** custom `container-section` (max-w-6xl + px responsivo)
- **Grid gap:** `gap-6` entre cards
- **Navbar height:** `h-16` (64px)

### Effects
- **Cards:** `bg-[rgba(26,26,26,0.5)] backdrop-blur-xl border border-[rgba(255,255,255,0.07)] rounded-xl`
- **Card hover:** `hover:border-[rgba(220,38,38,0.3)] hover:-translate-y-1`
- **Button primary:** `bg-[#dc2626] rounded-lg hover:bg-[#b91c1c]`
- **Button outline:** `bg-transparent border border-[rgba(255,255,255,0.25)] hover:border-[#dc2626]`
- **Navbar on scroll:** `backdrop-blur-xl bg-[rgba(10,10,10,0.92)]`
- **Scroll padding:** `scroll-padding-top: 5rem` (para navbar fixed não cobrir âncoras)

## Layout Pattern (CRITICAL)
Every section follows this exact pattern:
```tsx
<section className="w-full flex justify-center bg-[...] py-24 sm:py-28">
  <div className="container-section">
    <!-- content centered here -->
  </div>
</section>
```
- `flex justify-center` no pai força centralização em QUALQUER viewport
- `container-section` é utility custom (`max-w-6xl` + padding responsivo)
- `mx-auto` NÃO é usado como método primário de centralização (falhou)

## Component-Specific Notes

### Navbar
- `h-16`, links centrados, CTA à direita
- Mobile: hamburger com `overflow:hidden` no body quando aberto
- Scroll: backdrop-blur aparece após 20px de scroll

### Hero
- `h-screen min-h-[600px]`, fundo Unsplash + gradiente overlay
- Texto centralizado com `max-w-xl` dentro do container
- Scroll indicator com bounce animation

### Cardápio
- Categorias hardcoded em `cats`: Pizzas → Porções → Bebidas (CERVEJA + Refrigerantes mergeados)
- State `active` começa `null` (tudo oculto até clicar numa aba)
- Abas duplicadas no topo E no fim da lista de itens
- Grid: `grid-cols-1 sm:2 lg:3 gap-6`
- Imagens SEM `loading="lazy"` (lazy quebra com AnimatePresence)
- `bg-white` no wrapper da imagem + `object-cover`
- Fallback: emoji por categoria (🍕🥩🥤) quando `item.image` é null
- Itens sem imagem no JSON exibem o emoji no lugar

### Sobre
- Grid split: `grid-cols-1 lg:grid-cols-2 gap-16 items-center`
- Imagem `aspect-[4/5]` com gradiente overlay

## Animations (framer-motion)
- **Scroll reveal:** `whileInView={{ opacity:1, y:0 }}` com `viewport={{ once:true, margin:'-80px' }}`
- **Stagger:** `delay: i * 0.12` em grids
- **Cardápio tabs:** `AnimatePresence mode="wait"` com fade + slide 250ms
- **Hero:** fade + slide com stagger de 0.2s entre elementos

## Images
- Hero: `https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80`
- Cardápio: 45 JPEGs MenuDino (400×400) + 22 Unsplash (800×800) em `public/images/cardapio/`
- Sobre: `https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80`
- `loading="lazy"` removido das imagens do cardápio (quebra com AnimatePresence)
- `preconnect` para `images.unsplash.com` no HTML

## Cardápio Data
- `src/data/cardapio-limpo.json`: scraped do MenuDino, 66 itens em 4 categorias
- Categorias expostas no front: Pizzas (33), Porções (9), Bebidas (22 = 8 cervejas + 14 refrigerantes)
- `image`: path local `/images/cardapio/<uuid>.jpg`
- Para re-scraping: `scripts/download-large.mjs` baixa versões large e converte pra JPEG

## Commands
```bash
npm run dev       # Dev server (localhost:5173)
npm run build     # Build production → dist/
npm run preview   # Preview production build (localhost:4173)
```

## GitHub
- Repo: `github.com/v4ld0b3rt01164-code/lasabore`
- Branch: `master`
- Deploy automático via Cloudflare Pages (conectado ao GitHub)

## Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist/`
- SPA: `_redirects` configurado (`/* /index.html 200`)
- Deploy manual: `npx wrangler pages deploy dist/ --project-name lasabore --branch master`

## Opencode Config
- `opencode.json` na raiz do projeto
- Agente `vision`: `google/gemini-2.5-flash` (modelo com suporte a imagem)
  - Arquivo: `.opencode/agents/vision.md`
  - Uso: `@vision <comando>` no TUI
  - Permissões: leitura permitida, escrita negada

## Known Issues
- `loading="lazy"` NÃO usar em `<img>` dentro de `AnimatePresence` — o lazy loading combinado com a animação de entrada (opacity/y) faz o navegador nunca disparar o carregamento da imagem
- Imagens webp do MenuDino vieram com `show_frame=0` no cabeçalho VP8 — convertidas pra JPEG via ffmpeg
- Versões "small" do MenuDino são 126×126 thumbnails; usar "large" (400×400)
- `unsplash-pizza-002.jpg` e `unsplash-pizza-011.jpg` eram o mesmo arquivo (hash idêntico) — 011 removido, chocolate items agora usam `unsplash-choco-001.jpg`

## Pending / To Polish

## Design Rationale
- **Dark theme:** Dramático, destacar comida, contrastar com vermelho
- **Glass cards:** Profundidade sem poluir visual, backdrop-blur funciona bem em dark
- **Alternar bg #0a0a0a/#0d0d0d:** Separar seções sem usar divisores agressivos
- **Flex justify-center em vez de mx-auto:** mx-auto falhou em centralizar corretamente em alguns contextos no Tailwind v4
- **scroll-padding-top 5rem:** Compensar navbar fixed ao navegar por âncoras
