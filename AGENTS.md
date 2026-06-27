# La Sabore — Pizzaria Site

## Stack
- **Framework:** React 19 + Vite 8
- **Language:** TypeScript 6 (strict)
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Animation:** framer-motion 12
- **Icons:** lucide-react 21
- **Fonts:** Inter (400,500,600,700) + Playfair Display (500i,700i) via Google Fonts
- **Deploy:** Cloudflare Pages (`npm run build` → dist/, auto via GitHub)

## Key State (Jun 2026)
- Navbar: sem "La Sabore", só links centrados + CTA "Peça Agora" à direita
- Hero: logo `h-24` (`top-2`, `sm:left-16`), título "Sua pizza artesanal em Miguelópolis", sem subtítulo
- Destaques: Entrega Rápida → "Do forno direto pra sua mesa, sempre quentinha" (sem "30 min")
- CTA Final: "Faça seu pedido agora e receba no conforto da sua casa" (sem "30 min")
- Sobre: highlights em vermelho `text-[#dc2626]` com classe `highlight` (Playfair Display italic `text-lg`)
- Localização: inclui horários (Seg-Sáb 18h-23h, Dom 12h-22h)
- Footer: 2 colunas (logo centralizada + Redes Sociais), sem navegação, sem horários

## Layout Pattern (CRITICAL)
```tsx
<section className="w-full flex justify-center bg-[...] py-24 sm:py-28">
  <div className="container-section">
    <!-- content -->
  </div>
</section>
```
- `container-section`: `max-w-6xl` + px responsivo (utility custom no `index.css`)
- `mx-auto` NÃO usar como método primário de centralização (falhou no Tailwind v4)

## Design System

### Colors
| Token | Hex | Uso |
|-------|-----|-----|
| Background | `#0a0a0a` | Seções ímpares |
| Background alt | `#0d0d0d` | Seções pares (com `border-t`) |
| Text | `#ffffff` | Títulos |
| Text secondary | `rgba(255,255,255,0.55)` | Descrições |
| Text muted | `rgba(255,255,255,0.45)` | Labels, footer |
| Accent | `#dc2626` | CTAs, destaques, highlights |
| Accent hover | `#b91c1c` | Hover botões |
| Surface | `rgba(26,26,26,0.5)` | Glass cards bg |
| Border | `rgba(255,255,255,0.07)` | Borda cards |
| Section divider | `rgba(255,255,255,0.03)` | `border-t` entre seções |
| Gradient CTA | `from-[#dc2626] to-[#991b1b]` | Fundo CTA final |

### Effects
- Cards: `bg-[rgba(26,26,26,0.5)] backdrop-blur-xl border border-[rgba(255,255,255,0.07)] rounded-xl`
- Card hover: `hover:border-[rgba(220,38,38,0.3)] hover:-translate-y-1`
- Button primary: `bg-[#dc2626] rounded-lg hover:bg-[#b91c1c]`
- Button outline: `bg-transparent border border-[rgba(255,255,255,0.25)] hover:border-[#dc2626]`
- Navbar on scroll (>20px): `backdrop-blur-xl bg-[rgba(10,10,10,0.92)]`

## Custom CSS Utilities (`src/index.css`)
- `container-section`: max-w-6xl + padding responsivo
- `highlight`: Playfair Display italic, font-weight 700

## Component-Specific Notes

### Navbar
- `h-16`, sem texto "La Sabore"
- Layout: `container-section flex justify-between` com empty div à esquerda + links centrados + CTA à direita
- Mobile: hamburger com `overflow:hidden` no body
- Overlay mobile: `<div>` irmão do `<nav>` (usar `<>...</>` Fragment), NÃO dentro do nav — `backdrop-blur-xl` no nav quebra `position:fixed` do overlay filho
- Scroll: `transition-colors` (não `transition-all`), backdrop + bg após 20px

### Hero
- `h-screen min-h-[600px]`, fundo Unsplash + gradiente overlay
- Logo absoluto: `top-2 left-1/2 -translate-x-1/2 sm:left-16 sm:translate-x-0 h-24`
- Scroll indicator: ChevronDown com bounce animation

### Cardápio
- `active` começa `null` (tudo oculto até clicar)
- Abas duplicadas no topo E no fim
- Grid: `grid-cols-1 sm:2 lg:3 gap-6`
- Imagens SEM `loading="lazy"` (lazy + AnimatePresence quebra o carregamento)
- Fallback: emoji por categoria (🍕🥩🥤) quando `item.image` é null
- Labels das seções (`sobre nós`, `cardápio`, `diferenciais`, `entrega`, `onde estamos`): `text-lg highlight text-[#dc2626]` (Playfair Display italic, lowercase)

### Sobre
- Grid split: `grid-cols-1 lg:grid-cols-2 gap-16 items-center`
- Imagem: `aspect-[3/5] object-contain`, SEM `loading="lazy"`
- Highlights: `<span className="text-[#dc2626] highlight text-lg">`
- `loading="lazy"` NÃO usar — CSS global `img[loading="lazy"] { opacity: 0 }` esconde permanentemente se combinado com animação de entrada (motion opacity:0)

### Destaques
- 3 glass cards: Massa Artesanal, Entrega Rápida, Ingredientes Frescos
- Texto "30 minutos" removido — usar "Do forno direto pra sua mesa, sempre quentinha"

### Entrega
- 3 cards info (sem horários, sem botão "Fazer Pedido")

### Localização
- Endereço + Telefone + Horários (ícones MapPin, Phone, Clock)

## Animations (framer-motion)
- **Scroll reveal:** `whileInView={{ opacity:1, y:0 }}`, `viewport={{ once:true, margin:'-80px' }}`
- **Stagger:** `delay: i * 0.12`
- **Cardápio tabs:** `AnimatePresence mode="wait"` fade + slide 250ms
- **Hero:** fade + slide com stagger de 0.2s

## Images
- Hero bg: `https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1080&q=60` (com gradiente overlay, qualidade 60 é suficiente)
- Cardápio: `/images/cardapio/<nome>.jpg` (Unsplash + fornecidas, redimensionadas p/ 400px q:v5)
- Sobre: `/images/sobre.jpg` (local, 1200px q:v5)
- Localização: `/images/localizacao.jpg` (local, 1200px q:v5)
- Logo: `/images/logo.png` (local, 600px, usada no Hero `h-24` e Footer `h-14`)
- `preconnect` para `images.unsplash.com` no HTML

## Image Optimization (Jun 2026)
Todas as imagens foram otimizadas via ffmpeg com resize + compressão. Estado atual:

| Arquivo | Antes | Depois | Redução |
|---------|-------|--------|---------|
| Hero bg (Unsplash) | ~500 KB (1920w q80) | ~150 KB (1080w q60) | ~70% |
| `pexels-matreding-9685263.jpg` | 4.848 KB | deletado (não usado) | 100% |
| `sobre-section.png` | 2.014 KB | deletado (não usado) | 100% |
| `logo.png` | 2.164 KB | 250 KB (600px, comp_level 9) | 88% |
| `sobre.jpg` | 2.920 KB | 141 KB (1200px, q:v5) | 95% |
| 26 cardápio JPGs | 3.705 KB | 756 KB (400px, q:v5) | 80% |
| 4 PNGs cardápio | 1.767 KB | 456 KB (400px, comp_level 9) | 74% |
| `localizacao.jpg` | 115 KB | 85 KB (1200px, q:v5) | 26% |
| **Total imagens** | **~15,5 MB** | **~1,8 MB** | **~88%** |

### Regras de compressão
- **JPGs (`-q:v 5`)**: escala mjpeg 2-31 (2=melhor, 31=pior). q:v5 = excelente qualidade, usado em cardápio, sobre, localização.
- **PNGs (`-compression_level 9 -pred mixed`)**: compressão máxima sem perda, usado em logo e PNGs com alpha.
- **Unsplash params**: `w=1080&q=60` para hero (gradiente overlay mascara artefatos).
- **Resize máximo**: cardápio 400px, demais 1200px (exibidos em ~190px e ~600px respectivamente).
- Manter `loading="lazy"` removido de `<img>` com motion (ver gotchas).

## Cardápio Data
- `src/data/cardapio-limpo.json`: 66 itens, 4 categorias (Pizzas 33, Porções 9, Bebidas 22)
- Paths locais: `/images/cardapio/<nome>.jpg`

## Commands
```bash
npm run dev       # Dev server localhost:5173
npm run build     # Build → dist/
npm run preview   # Preview build localhost:4173
```

## Cloudflare Pages
- Build: `npm run build`, output: `dist/`
- SPA: `public/_redirects` → `/* /index.html 200`
- Auto-deploy via GitHub (branch `master`)
- Manual: `npx wrangler pages deploy dist/ --project-name lasabore --branch master`

## Known Gotchas
- `loading="lazy"` + motion `opacity:0` inicial = imagem nunca carrega (CSS global esconde lazy images e o navegador não dispara o fetch). Remover `loading="lazy"` de qualquer `<img>` dentro de motion com opacity animado.
- Overlay mobile (`position:fixed`) NÃO pode ser filho do `<nav>` com `backdrop-blur-xl` — o backdrop-filter cria containing block pro fixed child em alguns navegadores. Usar Fragment (`<>`) com overlay irmão do nav.
- `transition-all` no nav causa glitches no posicionamento do hamburger. Usar `transition-colors` em vez disso.
- Webp do MenuDino convertidas pra JPEG (show_frame=0 no VP8)
- `git add -A` pode capturar arquivos grandes acidentais na raiz (screenshots, mockups). Verificar com `git status --short` antes de commitar. Manter `.gitignore` atualizado.
