# La Sabore — Pizzaria Site

## Stack
- **Framework:** React 19 + Vite 8
- **Language:** TypeScript 6 (strict)
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Animation:** GSAP 3 + ScrollTrigger + framer-motion 12 (híbrido)
- **Smooth scroll:** Lenis 1.3
- **Icons:** lucide-react 21
- **Fonts:** SugarPeachy (display, arredondada — copiada do clone FlowFest, local em `/public/fonts/*.woff2`) + Quicksand (body) + Playfair Display italic (highlights)
- **Deploy:** Cloudflare Pages (`npm run build` → dist/, auto via GitHub)

## Design Direction (Jun 2026 — Radical Layout Refactor)
Layout inspirado no clone do FlowFest (em `flowfest-clone/`). Peça central é a **RainbowBars** (animação das 9 barras verticais SVG em cores da bandeira italiana).

### Paleta
| Token | Hex | Uso |
|-------|-----|-----|
| `bg` | `#121212` | Fundo escuro do site todo (FlowFest dark) |
| `bg-elev` | `#1a1a1a` | Cards / superfícies elevadas |
| `cream` | `#F3ECD2` | Texto principal (FlowFest light) |
| `cream-muted` | `rgba(243,236,210,0.65)` | Texto secundário |
| `cream-dim` | `rgba(243,236,210,0.45)` | Texto small |
| `italia-green` | `#009246` | Verde bandeira (1/3 das barras) |
| `italia-white` | `#FFFFFF` | Branco bandeira (1/3 das barras) |
| `italia-red` / accent | `#DC2626` | Vermelho bandeira (1/3 das barras) + CTAs + acentos |
| `red-accent` | `#EA384C` | Hover vermelho (FlowFest) |
| `amber` | `#F3A20F` | Tons pastéis/terrosos (FlowFest) |
| `amber-deep` | `#FFAE1C` | Dourado |
| `yellow-pastel` | `#F0BB0D` | Amarelo pastel |
| `orange-earth` | `#F97028` | Laranja terroso |
| `pink-pastel` | `#F489A3` | Rosa pastel |
| `wine` | `#811933` | Vinho profundo |

### Tipografia
- **Display** (`@utility display`): SugarPeachy Black (900), para títulos grandes
- **Body**: Quicksand (500/700)
- **Highlight** (`@utility highlight`): Playfair Display italic, para destaques inline (`paixão`, `sonho`, etc.)

## Layout Pattern (CRITICAL)
```tsx
<section className="w-full flex justify-center border-t border-[#F3ECD2]/8 py-24 sm:py-28">
  <div className="container-section">
    <!-- content -->
  </div>
</section>
```
- `container-section`: `max-w-80rem` (5xl) + px responsivo (`px-5 sm:px-12 lg:px-20`)
- `section-pad`: `py-28 sm:py-44` (opcional, mais espaçoso)

## RainbowBars (peça central)
`src/components/RainbowBars.tsx`
- SVG com 9 paths: outlines pretos (`strokeWidth=52`) + 9 fills coloridos por cima (`strokeWidth=48`)
- Cores (esquerda → direita): 3× `#009246` + 3× `#FFFFFF` + 3× `#DC2626` (bandeira italiana)
- Animação: `strokeDasharray`/`strokeDashoffset` animado via GSAP ScrollTrigger `scrub: 0.4`
- NÃO usa DrawSVGPlugin (Club GreenSock pago) — efeito "draw" recriado manualmente porque as linhas são retas (comprimento fixo = 600)
- Props: `direction` (`'down'|'up'`), `scrub` (bool), `stagger`, `duration`, `className`

## Componentes

### Navbar
- `h-16`, transparente no topo → `backdrop-blur-xl bg-[rgba(18,18,18,0.88)]` após 20px scroll
- "La Sabore" em fonte SugarPeachy (display), aparece ao scroll (`opacity-0 → 100`)
- Links: Sabores · Entrega · Sobre · Onde estamos
- CTA "Peça Agora" vermelho, rounded-full
- Mobile: overlay irmão do nav (Fragment `<>`), backdrop-blur, sem texto do logo
- `transition-colors` (não `transition-all` — evita glitches no hamburger)

### Hero
- `min-h-screen`, fundo Unsplash com `opacity-25` + gradiente overlay para `#121212`
- Top: logo `h-16 sm:h-20` + badge "Forno a lenha · desde 2018"
- Headline SugarPeachy gigante: "Sua pizza / artesanal em / **Miguelópolis**" (3 linhas, "Miguelópolis" em vermelho)
- Subtítulo + 2 CTAs ("Ver sabores" sólido vermelho + "Peça agora" outline cream)
- **RainbowBars à direita** (desktop) / acima do título (mobile)
- Scroll indicator: ChevronDown com `animate-bounce-down`
- Animação entrada: timeline GSAP com stagger nas linhas do título

### Destaques
- 3 cards: Massa Artesanal (🔥 `#F97028`), Ambiente Familiar (❤️ `#F489A3`), Ingredientes Frescos (🌿 `#F0BB0D`)
- Cards: `bg-[#1a1a1a] border border-[#F3ECD2]/10 rounded-2xl` + hover `-translate-y-1`
- Ícone em container com cor pastel + `22` opacity (ex: `#F9702822`)
- Heading SugarPeachy `text-2xl`, descrição Quicksand `text-sm text-[#F3ECD2]/65`
- Label `// diferenciais` em vermelho com `tracking-[0.2em] uppercase`

### Cardápio (id="sabores")
- `active` começa `'Pizzas'`
- Abas duplicadas no topo E no fim (pills `rounded-full`, ativo = `bg-[#F3ECD2] text-[#121212]`)
- Grid: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4`
- Cards `bg-[#1a1a1a] border border-[#F3ECD2]/10 rounded-xl`
- Imagens com `group-hover:scale-105` transition
- Fallback: emoji por categoria
- Preços ocultos nos cards (mantidos no JSON)

### Entrega (id="entrega")
- Label `// entrega` + título "Peça pelo site ou WhatsApp"
- 3 cards: Delivery Rápido, Área de Cobertura, Pagamento Seguro (mesmo padrão de Destaques, cores pastéis diferentes)

### Sobre (id="sobre")
- Grid split: `grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20`
- Texto cream com highlights Playfair italic
- Imagem `rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]`
- Sem `loading="lazy"` (CSS global esconde lazy + motion opacity:0 = nunca carrega)

### Localização (id="contato")
- 3 cards (Endereço / Telefone / Horários) com ícones MapPin, Phone, Clock
- Telefone é link para WhatsApp
- Imagem no topo `rounded-2xl border border-[#F3ECD2]/10`

### CtaFinal (id="pedido")
- `bg-[#DC2626]`, círculos decorativos
- Título "Bateu a fome?" SugarPeachy gigante `text-5xl sm:text-7xl md:text-8xl`
- 2 botões: "Fazer Pedido" (preto) + "WhatsApp" (outline branco)

### Footer
- `bg-[#0d0d0d]` (mais escuro que o body)
- 2 colunas: logo + descrição (esquerda) / "Acompanhe" + redes sociais (direita, alinhado à direita)
- Endereço também no footer

## Smooth Scroll
- `src/lib/smooth-scroll.ts` → hook `useSmoothScroll()` (chamado no `App.tsx`)
- Lenis 1.3 com `duration: 1.1` + easing custom
- Integrado ao GSAP ticker (`lenis.on('scroll', ScrollTrigger.update)`)
- Scrollbar nativa oculta via CSS (`::-webkit-scrollbar { width: 0 }`)

## Animations
- **GSAP ScrollTrigger scrub**: RainbowBars (draw das barras sincronizado com scroll)
- **GSAP timeline**: entrada do Hero (logo → label → linhas título → sub → CTA → scroll indicator)
- **framer-motion `whileInView`**: scroll reveal dos cards (Destaques, Entrega), stagger `i * 0.12`
- **framer-motion `AnimatePresence mode="wait"`**: troca de tabs no Cardápio

## Images
- Hero bg: `https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1080&q=60` (com `opacity-25` no novo design — fundo muito sutil)
- Cardápio: `/images/cardapio/<nome>.jpg`
- Sobre: `/images/sobre.jpg`
- Localização: `/images/localizacao.jpg`
- Logo: `/images/logo.png`
- `preconnect` para `images.unsplash.com` e `fonts.gstatic.com` no HTML

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
- Auto-deploy via GitHub (branch `master`)
- Manual: `npx wrangler pages deploy dist/ --project-name lasabore --branch master`

## flowfest-clone/
- Clone local do site FlowFest (Webflow export) — referência visual / source das fontes
- NÃO é buildado / deployado — ignorado pelo lint (`.oxlintrc.json`) e pelo vite (não está em `src/`)
- Fontes copiadas para `public/fonts/`: SugarPeachy (Black/Medium/Regular) + Quicksand (Bold/Medium)

## Known Gotchas
- `loading="lazy"` + motion `opacity:0` inicial = imagem nunca carrega (CSS global esconde lazy images). Remover `loading="lazy"` de `<img>` dentro de motion animado.
- Overlay mobile (`position:fixed`) NÃO pode ser filho do `<nav>` com `backdrop-blur-xl` — usar Fragment (`<>`).
- `transition-all` no nav causa glitches no hamburger. Usar `transition-colors`.
- GSAP `gsap.context()` + cleanup `ctx.revert()` em `useEffect` para evitar leaks no StrictMode.
- Lenis precisa ser integrado ao ticker do GSAP (`gsap.ticker.add`) senão ScrollTrigger fica dessincronizado.
- DrawSVGPlugin é pago (Club GreenSock). Em vez de bundlar o `.min.js` do clone, recriamos o efeito "draw" manualmente com `strokeDasharray`/`strokeDashoffset` — funciona porque as barras são linhas retas (comprimento fixo 600px).
- `git add -A` pode capturar arquivos grandes acidentais. Verificar `git status --short` antes de commitar.

## TODO / Próximos refinamentos possíveis
- RainbowBars horizontais (`rainbow-sides`) em outras seções, como no FlowFest
- Marquee infinito de logos/ingredientes (CSS `.animate-marquee` já pronto no index.css)
- Cursores customizados (copiar SVGs do `flowfest-clone/assets/images/*cursor*`)
- SplitText do título do Hero (atualmente stagger por `<span>` manual)
