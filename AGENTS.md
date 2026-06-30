# La Sabore — Pizzaria Site (v2 alternativo)

## Stack
- React 19 + Vite 8 + TypeScript 6 (strict)
- Tailwind CSS v4 via `@tailwindcss/vite`
- GSAP 3 + ScrollTrigger + framer-motion 12
- Lenis 1.3 (smooth scroll)
- lucide-react + fonts locais (SugarPeachy, Quicksand)

## Commands
```bash
npm run dev      # localhost:5173
npm run build    # tsc -b && vite build → dist/
npm run lint     # oxlint
npm run preview  # vite preview
```

## Deploy
Cloudflare Pages:
```bash
npx wrangler pages deploy dist/ --project-name lasabore2-alt --branch master
```
- Output directory no dashboard do Cloudflare Pages deve ser `dist/`. Se estiver errado, o auto-build serve o `index.html` da raiz em vez do `dist/index.html`.

## Design Tokens
| Token | Hex | Uso |
|-------|-----|-----|
| `bg` | `#f0bb0d` | Fundo do site |
| `ink` | `#121212` | Texto principal |
| `ink-muted` | `rgba(18,18,18,0.65)` | Texto secundário |
| `card` | `#FFFFFF` | Cards (quando aplicável) |
| `italia-green` | `#009246` | Verde bandeira |
| `italia-red` | `#DC2626` | Vermelho bandeira + CTAs |
| `wine` | `#811933` | Vinho (bordas, detalhes) |
| `footer` | `#0d0d0d` | Footer |
| `black` | `#000000` | Texto puro em cards/Localização |

## Arquitetura de Componentes
- `src/App.tsx` empilha as seções na ordem: Navbar → Hero → Destaques → Cardápio → Entrega → Sobre → Localização → CtaFinal → Footer.
- `src/components/RainbowBars.tsx` é o componente decorativo mais sensível. Não altere seu lifecycle GSAP nem adicione props que forcem re-render. Qualquer mudança pode causar tela preta.
- `src/lib/smooth-scroll.ts` integra Lenis ao GSAP ticker.

## Seções — estado atual

### Hero
- Fundo `#f0bb0d`, `min-h-screen`.
- Logo `logo-hero.webp` + animação `Chef.svg` (200×200 px) agrupados e centralizados.
- Logo reduzido (~20%): `h-32 sm:h-36 lg:h-40`.
- Chef: 200×200 px, overlap visual com o logo via `translate-x` negativo (`-translate-x-10 lg:-translate-x-16`). Mantém o agrupamento centralizado no fluxo do layout.
- Pizza `pizza-hero.webp` invertida (`-scale-x-100`) com sombra.
- RainbowBars `curve` nas laterais (`.hero-rainbow`).

### Destaques
- Cards estilo "cartão postal": fundo transparente, borda tracejada `2.5px` vinho, selo vermelho no canto.
- Texto preto puro, ícones vermelhos.
- RainbowBars `straight` na lateral direita.

### Entrega
- Header: texto centralizado + animação `delivery.svg` (150×150 px) ao lado, sem sombra.
- Cards estilo "ticket vintage": fundo `#FFF8E1`, formato horizontal, recortes nos cantos, linha tracejada grossa separando ícone e texto.
- RainbowBars `straight` × 9 em perspectiva 3D no rodapé.

### Cardápio
- Drawer deslizante da direita com abas: Pizzas · Doces · Porções · Bebidas.
- Grid `grid-cols-2` de cards com imagem/emoji.

### CtaFinal
- Fundo `#DC2626`, texto branco, botões "Fazer Pedido" (preto/amarelo) e "WhatsApp" (contorno branco).
- Animação `pedido.svg` (150×150 px) ao lado direito do botão WhatsApp, com overlap via `sm:-ml-5` e elevada 10 px (`-translate-y-2.5`).
- Sem sombra (fundo transparente) e `pointer-events-none`.

### Sobre / Localização / Footer
- Veja os componentes; mantêm as diretrizes gerais de cores e tipografia.

## Regras de Mídia
- **Nunca usar `loading="lazy"` em `<img>`** — impede imagens abaixo da dobra de carregar em algumas seções.
- **Não usar `vite-plugin-image-optimizer`** — está no `package.json` como resquício, mas não está no `vite.config.ts` porque re-otimização em build corrompe imagens.
- Manter animações `.webm` no tamanho original quando forem de baixa resolução. Upscaling deixa serrilhado.
- Elementos com fundo transparente (vídeos, animações) não devem ter `shadow` se o objetivo é integração visual com o fundo amarelo.

## Animação — Gotchas Críticos
- `transition-all` conflita com animações GSAP/framer-motion. Preferir `transition-colors` ou `transition-transform`.
- Cards com fundo sólido evitam oscilação visual ao scrollar sobre RainbowBars animadas.
- GSAP: usar `gsap.context()` + `ctx.revert()` no `useEffect`.
- RainbowBars NÃO pode receber novos props nem re-renderizar — `gsap.context()` + `ctx.revert()` corrompe o SVG inline se props como `scrub` mudarem.
- `window.innerWidth` só deve ser usado dentro de `useEffect` — uso direto causou tela preta no passado (conflito Lenis + ScrollTrigger).

## Mobile Rainbow Load (Hero)
`MobileRainbowDraw` em `Hero.tsx`:
- Aguarda 2s após o load.
- Anima `totalProgress()` dos ScrollTriggers de `.hero-rainbow` (duração 2.64s, `sine.inOut`).
- Desabilita o ScrollTrigger durante a animação e recria-o sincronizado com a posição atual do scroll ao final.
- Após o load, o rainbow fica desenhado; ao rolar, retrocede suavemente.

## Flash no Load
Elementos do Hero nascem com `opacity-0` no CSS e entram via `.fromTo()` (não `.from()`), garantindo que não haja flash branco antes do GSAP assumir.
