# La Sabore — Pizzaria Site (v2 alternativo)

## Stack
- **Framework:** React 19 + Vite 8
- **Language:** TypeScript 6 (strict)
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Animation:** GSAP 3 + ScrollTrigger + framer-motion 12 (híbrido)
- **Smooth scroll:** Lenis 1.3
- **Icons:** lucide-react 21
- **Fonts:** SugarPeachy (display) + Quicksand (body) + Playfair Display italic (highlights)
- **Repo:** `github.com/v4ld0b3rt01164-code/lasabore2`
- **Deploy:** Cloudflare Pages (`npx wrangler pages deploy dist/ --project-name lasabore2-alt --branch master`)

## Design Direction (Jun 2026)
Fundo amarelo pastel `#f0bb0d`. RainbowBars (3 barras bandeira italiana) como peça decorativa em todas as seções.

### Paleta
| Token | Hex | Uso |
|-------|-----|-----|
| `bg` | `#f0bb0d` | Fundo do site todo |
| `ink` | `#121212` | Texto principal |
| `ink-muted` | `rgba(18,18,18,0.65)` | Texto secundário |
| `card` | `#FFFFFF` | Cards (fundo branco sólido) |
| `italia-green` | `#009246` | Verde bandeira |
| `italia-white` | `#FFFFFF` | Branco bandeira |
| `italia-red` | `#DC2626` | Vermelho bandeira + CTAs |
| `red-accent` | `#EA384C` | Hover vermelho |
| `wine` | `#811933` | Vinho |
| `footer` | `#0d0d0d` | Fundo do footer |
| `black` | `#000000` | Preto puro (texto Localização) |

### Tipografia
- **Display**: SugarPeachy Black (900), títulos grandes
- **Body**: Quicksand (500/700)
- **Highlight**: Playfair Display italic

## RainbowBars
`src/components/RainbowBars.tsx` — SVG 3 barras bandeira italiana `[#009246, #FFFFFF, #DC2626]`. Animação `strokeDasharray`/`strokeDashoffset` via GSAP ScrollTrigger scrub. Outlines transparentes. Props: `variant` (`straight|curve`), `colors`, `strokeWidth`, `outline`, `direction`, `scrub`, `scrollStart`, `scrollEnd`, `stagger`, `duration`.

### Instâncias
| Seção | Variant | Barras | Posição |
|-------|---------|--------|---------|
| Hero | `curve` ×2 (espelhadas) | 3 | L-curvas decorativas no topo |
| Destaques | `straight` | 3 | Lateral direita (absolute) |
| Sobre | `straight` | 3 | Lateral esquerda (absolute, hidden mobile) |
| Entrega | `straight` | 9 | Perspectiva 3D abaixo dos cards |

## Componentes

### Navbar
- `h-16`, `bg-[#121212]` preto sólido desde o início
- "La Sabore" em SugarPeachy branco, visível sempre
- Links: Sabores · Entrega · Sobre · Onde estamos
- CTA "Peça Agora" vermelho
- Mobile: overlay preto

### Hero
- Fundo `#f0bb0d`, `min-h-screen`
- Rainbow-sides: L-curvas espelhadas (topo direita + bottom esquerda)
- Grid 2 colunas: logo+texto (centralizados) | pizza (direita)
- Logo `logo-hero.png`, `h-40 lg:h-52`, centralizado sobre o texto
- Headline 2 linhas: "Sua pizza artesanal em" + "Miguelópolis" (vermelho), `text-3xl lg:text-6xl`
- Pizza `pizza-hero.png` invertida horizontalmente (`-scale-x-100`), sombra `drop-shadow(4px 4px 2px rgba(18,18,18,0.6))`
- Scroll indicator: ChevronDown com `animate-bounce-down`
- Animação GSAP: logo → headline → scroll indicator

### Destaques
- 3 cards brancos: Massa Artesanal / Ambiente Familiar / Ingredientes Frescos
- Cards: `bg-white border rounded-2xl`, hover `-translate-y-1`
- RainbowBars lateral direita (3 barras)
- Sem framer-motion (cards estáticos para evitar conflito de opacidade)

### Cardápio (id="sabores")
- Título "O forno está aceso"
- Drawer desliza da direita, abas Pizzas · Doces · Porções · Bebidas
- Grid `grid-cols-2` de cards com imagem/emoji
- `AnimatePresence mode="wait"` na troca de tabs

### Entrega (id="entrega")
- 3 cards brancos: Delivery Rápido / Área de Cobertura / Pagamento Seguro
- RainbowBars perspectiva 3D no rodapé (9 barras, `rotateX(45deg)`)
- Sem framer-motion nos cards

### Sobre (id="sobre")
- Grid split texto + imagem, foto reduzida `max-w-xs lg:max-w-sm`
- RainbowBars lateral esquerda (3 barras, `hidden sm:block`)

### Localização (id="contato")
- Sem cards, texto e ícones em preto puro `#000000`
- Layout flex com separador vertical `|` entre os itens
- Foto da fachada no topo

### CtaFinal (id="pedido")
- `bg-[#DC2626]`, "Bateu a fome?"
- Botões Fazer Pedido + WhatsApp

### Footer
- `bg-[#0d0d0d]`, texto branco, altura reduzida
- Esquerda: logo centralizado sobre "Sua pizza artesanal em Miguelópolis."
- Direita: @lasaboremiguelopolis (Instagram) + (16) 99231-5122 (WhatsApp)

## Smooth Scroll
- Lenis 1.3 integrado ao GSAP ticker

## Imagens
- Hero: `logo-hero.png`, `pizza-hero.png` (~2.7MB, invertida)
- Cardápio: `/images/cardapio/<nome>.jpg`
- Sobre: `/images/sobre.jpg`
- Localização: `/images/localizacao.jpg`

## Commands
```bash
npm run dev       # localhost:5173
npm run build     # Build → dist/
npm run lint      # oxlint
```

## Cloudflare Pages
- Build: `npm run build`, output: `dist/`
- Deploy: `npx wrangler pages deploy dist/ --project-name lasabore2-alt --branch master`
- URL: `lasabore2-alt.pages.dev`

## Known Gotchas
- `loading="lazy"` + motion `opacity:0` = imagem não carrega
- `transition-all` conflita com animações — usar `transition-colors`
- Cards usam `bg-white` sólido (sem transparência) para evitar oscilação visual ao scrollar sobre rainbows animadas
- GSAP `gsap.context()` + `ctx.revert()` no useEffect
- DrawSVGPlugin pago — efeito recriado com `strokeDasharray`/`strokeDashoffset`
- RainbowBars NÃO pode receber novos props nem re-renderizar — `gsap.context()` + `ctx.revert()` corrompe o SVG inline se o prop `scrub` mudar, causando tela preta
- Modificar o RainbowBars.tsx quebra o site inteiro (tela preta) — qualquer alteração no lifecycle do GSAP dentro dele é instável
- `window.innerWidth` sem useState/useEffect tbm causou tela preta — possivelmente conflito com Lenis + ScrollTrigger
- Solução alternativa: animar SVGs duplicados via CSS `@keyframes` no mobile, ou aceitar que rainbow só anima com scroll em todos os breakpoints
- Animação mobile: CSS `@keyframes` no Hero.tsx via `<style>` tag — anima `stroke-dashoffset` de 10000px a 0 nas `.hero-rainbow [data-bar-fill]`. Não toca nos props do RainbowBars. Desktop continua com ScrollTrigger scrub.
- `npx wrangler pages deploy` com `--commit-hash=$(git rev-parse HEAD)` força upload correto dos assets
- Cloudflare Pages **git integration** deve ter output directory = `dist/` (config no dashboard), senão o auto-build serve o `index.html` da raiz (com `/src/main.tsx`) em vez do `dist/index.html`
