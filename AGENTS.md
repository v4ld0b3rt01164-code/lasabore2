# La Sabore — Pizzaria Site

## Stack
- **Framework:** React 19 + Vite 8
- **Language:** TypeScript 6 (strict)
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Animation:** GSAP 3 + ScrollTrigger + framer-motion 12 (híbrido)
- **Smooth scroll:** Lenis 1.3
- **Icons:** lucide-react 21
- **Fonts:** SugarPeachy (display, arredondada — copiada do clone FlowFest, local em `/public/fonts/*.woff2`) + Quicksand (body) + Playfair Display italic (highlights)
- **Repo:** `github.com/v4ld0b3rt01164-code/lasabore2`
- **Deploy:** Cloudflare Pages (`npm run build` → dist/, `npx wrangler pages deploy dist/ --project-name lasabore --branch master`)

## Design Direction (Jun 2026 — Lime + Bandeira Italiana)
Layout inspirado no clone do FlowFest (em `flowfest-clone/`). Peça central é a **RainbowBars** (3 barras SVG em cores da bandeira italiana).

### Paleta (light / lime)
| Token | Hex | Uso |
|-------|-----|-----|
| `bg` | `#d4ed31` | Fundo lime do site todo |
| `ink` | `#121212` | Texto principal / títulos |
| `ink-muted` | `rgba(18,18,18,0.65)` | Texto secundário |
| `ink-dim` | `rgba(18,18,18,0.45)` | Texto small |
| `card` | `#FFFFFF` | Superfícies elevadas (cards brancos) |
| `card-elev` | `#1a1a1a` | Cards dark (não usado no light mode atual) |
| `italia-green` | `#009246` | Verde bandeira (1/3 barras) |
| `italia-white` | `#FFFFFF` | Branco bandeira (1/3 barras) |
| `italia-red` / accent | `#DC2626` | Vermelho bandeira (1/3 barras) + CTAs |
| `red-accent` | `#EA384C` | Hover vermelho |
| `amber` | `#F3A20F` | Tons pastéis/terrosos |
| `amber-deep` | `#FFAE1C` | Dourado |
| `yellow-pastel` | `#F0BB0D` | Amarelo pastel |
| `orange-earth` | `#F97028` | Laranja terroso |
| `pink-pastel` | `#F489A3` | Rosa pastel |
| `wine` | `#811933` | Vinho profundo |

### Tipografia
- **Display** (`@utility display`): SugarPeachy Black (900), para títulos grandes
- **Body**: Quicksand (500/700)
- **Highlight** (`@utility highlight`): Playfair Display italic, para destaques inline (`paixão`, `sonho`, etc.)

## Layout Pattern
```tsx
<section className="w-full flex justify-center border-t border-[#121212]/10 py-24 sm:py-28">
  <div className="container-section">
    <!-- content -->
  </div>
</section>
```
- `container-section`: `max-w-80rem` (5xl) + px responsivo (`px-5 sm:px-12 lg:px-20`)

## RainbowBars (peça central)
`src/components/RainbowBars.tsx`
- SVG com paths: outlines transparentes + fills coloridos por cima
- **Padrão (3 barras)**: bandeira italiana `[#009246, #FFFFFF, #DC2626]` — usado nas laterais de Destaques/Sobre e nas L-curvas do Hero
- **Perspectiva 3D (9 barras)**: `3×#009246 3×#FFFFFF 3×#DC2626` — usado no rodapé da Entrega (`rotateX(45deg)`, `perspective: 25em`)
- Animação: `strokeDasharray`/`strokeDashoffset` via GSAP ScrollTrigger `scrub: 0.4`
- NÃO usa DrawSVGPlugin (Club GreenSock pago) — efeito "draw" recriado manualmente
- Props: `variant` (`'straight'|'curve'`), `colors` (array), `strokeWidth`, `outline` (bool), `direction` (`'down'|'up'`), `scrub`, `stagger`, `duration`, `className`
- Outlines são `stroke="transparent"` (não aparecem — evita retângulos pretos cobrindo a página)

### Instâncias de RainbowBars no site
| Seção | Variant | Barras | Cores | Posição |
|-------|---------|--------|-------|---------|
| Hero (topo) | `curve` ×2 (espelhadas) | 3 | Bandeira ITA | L-curvas decorativas no topo |
| Destaques | `straight` | 3 | Bandeira ITA | Lateral direita (absolute) |
| Sobre | `straight` | 3 | Bandeira ITA | Lateral esquerda (absolute) |
| Entrega (rodapé) | `straight` | 9 | Bandeira ITA | Perspectiva 3D abaixo dos cards |

## Componentes

### Navbar
- `h-16`, transparente no topo → `backdrop-blur-xl bg-[rgba(18,18,18,0.88)]` após 20px scroll
- "La Sabore" em fonte SugarPeachy (display), aparece ao scroll
- Links: Sabores · Entrega · Sobre · Onde estamos
- CTA "Peça Agora" vermelho, rounded-full
- Mobile: overlay irmão do nav (Fragment `<>`)
- `transition-colors` (não `transition-all` — evita glitches no hamburger)

### Hero
- `min-h-screen`, fundo `bg-[#d4ed31]` (lime)
- **Logo** grande (`h-24 sm:h-32 lg:h-40`) centralizado no topo
- **Headline** "Sua pizza artesanal em **Miguelópolis**" (1 linha, Miguelópolis em vermelho, `text-3xl sm:text-5xl lg:text-6xl`)
- **Imagem** `/images/pizza-hero.png`: espelhada (`-scale-x-100`), sombra difusa (`drop-shadow(0 16px 32px rgba(18,18,18,0.45))`), desliza da direita via GSAP (`x: 200 → 0`). `max-w-xl lg:max-w-2xl`
- **Rainbow-sides**: par de L-curvas (`curve`) no topo — direita topo (direction down) + esquerda bottom espelhada (`-scale-100`, direction down)
- Scroll indicator: ChevronDown com `animate-bounce-down`
- Sem botões/CTAs (removidos)
- Animação entrada: timeline GSAP com stagger no título

### Destaques (id="destaques" — implícito)
- 3 cards: Massa Artesanal (🔥 `#F97028`), Ambiente Familiar (❤️ `#F489A3`), Ingredientes Frescos (🌿 `#F0BB0D`)
- Cards brancos: `bg-white border border-[#121212]/10 rounded-2xl` + hover `-translate-y-1`
- Ícone em container com cor pastel + `22` opacity
- Heading SugarPeachy `text-2xl`, descrição Quicksand `text-sm text-[#121212]/65`
- Label `// diferenciais` em vermelho com `tracking-[0.2em] uppercase`
- **RainbowBars lateral direita**: 3 barras italianas, absolute, hidden no mobile

### Cardápio (id="sabores")
- **Título**: "O forno está aceso"
- Drawer que abre do botão "Ver Cardápio" (desliza da direita, `ease: [0.625, 0.05, 0, 1]`)
- Abas: Pizzas · Doces · Porções · Bebidas (pills `rounded-full`, ativo = `bg-[#121212] text-[#d4ed31]`)
- Grid: `grid-cols-1 sm:grid-cols-2` de cards com imagem/emoji
- `AnimatePresence mode="wait"` na troca de tabs
- Preços ocultos (mantidos no JSON)

### Entrega (id="entrega")
- Label `// entrega` + título "Peça pelo site ou WhatsApp"
- 3 cards: Delivery Rápido, Área de Cobertura, Pagamento Seguro (framer-motion `whileInView`)
- **RainbowBars perspectiva 3D**: 9 barras italianas no rodapé com `perspective: 25em` + `rotateX(45deg)` (efeito piso, hidden no mobile)

### Sobre (id="sobre")
- Grid split: `grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20`
- Texto ink com highlights Playfair italic + trechos em `text-[#DC2626]`
- Imagem `rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]`
- **RainbowBars lateral esquerda**: 3 barras italianas, absolute, hidden no mobile, `direction="up"`
- Sem `loading="lazy"` (CSS global esconde lazy + motion opacity:0 = nunca carrega)

### Localização (id="contato")
- 3 cards (Endereço / Telefone / Horários) com ícones MapPin, Phone, Clock
- Telefone é link para WhatsApp
- Imagem no topo `rounded-2xl border border-[#121212]/10`

### CtaFinal (id="pedido")
- `bg-[#DC2626]`, círculos decorativos
- Título "Bateu a fome?" SugarPeachy gigante `text-5xl sm:text-7xl md:text-8xl`
- 2 botões: "Fazer Pedido" (preto) + "WhatsApp" (outline branco)

### Footer
- `bg-[#0d0d0d]` (mais escuro que o body)
- 2 colunas: logo + descrição (esquerda) / "Acompanhe" + redes sociais (direita)
- Endereço também no footer

## Smooth Scroll
- `src/lib/smooth-scroll.ts` → hook `useSmoothScroll()` (chamado no `App.tsx`)
- Lenis 1.3 com `duration: 1.1` + easing custom
- Integrado ao GSAP ticker (`lenis.on('scroll', ScrollTrigger.update)`)
- Scrollbar nativa oculta via CSS (`::-webkit-scrollbar { width: 0 }`)

## Animations
- **GSAP ScrollTrigger scrub**: RainbowBars (draw sincronizado com scroll)
- **GSAP timeline**: entrada do Hero (logo → linha título → foto desliza da direita → scroll indicator)
- **framer-motion `whileInView`**: scroll reveal dos cards (Destaques, Entrega), stagger `i * 0.12`
- **framer-motion `AnimatePresence mode="wait"`**: troca de tabs no Cardápio

## Images
- Hero: `/images/pizza-hero.png` (~2.7MB, espelhada, sombra difusa)
- Cardápio: `/images/cardapio/<nome>.jpg`
- Sobre: `/images/sobre.jpg`
- Localização: `/images/localizacao.jpg`
- Logo: `/images/logo.png`

## Cardápio Data
- `src/data/cardapio-limpo.json`: 66 itens, 4 categorias (Pizzas 33, Porções 9, Bebidas 22)
- Paths locais: `/images/cardapio/<nome>.jpg`

## Commands
```bash
npm run dev       # Dev server localhost:5173
npm run build     # Build → dist/ (tsc -b && vite build)
npm run preview   # Preview build localhost:4173
npm run lint      # oxlint (ignora flowfest-clone, dist, node_modules via .oxlintrc.json)
```

## Cloudflare Pages
- Build: `npm run build`, output: `dist/`
- SPA: `public/_redirects` → `/* /index.html 200`
- Manual deploy: `npx wrangler pages deploy dist/ --project-name lasabore --branch master`

## flowfest-clone/
- Clone local do site FlowFest (Webflow export) — referência visual / source das fontes
- NÃO é buildado / deployado — ignorado pelo lint e pelo vite
- Fontes copiadas para `public/fonts/`: SugarPeachy (Black/Medium/Regular) + Quicksand (Bold/Medium)
- 4 instâncias de rainbow replicadas no projeto

## Known Gotchas
- `loading="lazy"` + motion `opacity:0` inicial = imagem nunca carrega. Remover `loading="lazy"` de `<img>` dentro de motion animado.
- Overlay mobile (`position:fixed`) NÃO pode ser filho do `<nav>` com `backdrop-blur-xl` — usar Fragment (`<>`).
- `transition-all` no nav causa glitches no hamburger. Usar `transition-colors`.
- GSAP `gsap.context()` + cleanup `ctx.revert()` em `useEffect` para evitar leaks no StrictMode.
- Lenis precisa ser integrado ao ticker do GSAP (`gsap.ticker.add`) senão ScrollTrigger fica dessincronizado.
- DrawSVGPlugin é pago (Club GreenSock). Efeito "draw" recriado com `strokeDasharray`/`strokeDashoffset`.
- `git add -A` pode capturar arquivos grandes. Verificar `git status --short` antes de commitar.
