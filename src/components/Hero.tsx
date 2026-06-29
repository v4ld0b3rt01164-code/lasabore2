import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import RainbowBars from './RainbowBars'

gsap.registerPlugin(ScrollTrigger)

// Bandeira italiana para as L-curvas laterais (3 barras: verde/branco/vermelho)
const sideColors = ['#009246', '#FFFFFF', '#DC2626']

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-logo]', { opacity: 0, y: -20, duration: 0.8 })
        .from('[data-hero-line]', {
          opacity: 0,
          y: 40,
          duration: 0.9,
        }, '-=0.2')
        .from('[data-hero-photo]', {
          opacity: 0,
          x: 200,
          duration: 1.1,
          ease: 'power2.out',
        }, '-=0.5')
        .from('[data-hero-scroll]', { opacity: 0, duration: 0.6 }, '-=0.2')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#d4ed31] flex flex-col"
    >
      {/* rainbow-sides: par de L-curvas espelhadas (decorativo, topo) */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        {/* right — topo direita — entra as cores (down) */}
        <div className="absolute top-0 right-[-3em] w-[18em] h-auto opacity-90">
          <RainbowBars
            className="aspect-[321/626] w-full"
            variant="curve"
            colors={sideColors}
            strokeWidth={48}
            outline={false}
            direction="down"
            scrub
            duration={1.2}
            stagger={0.075}
          />
        </div>
        {/* left — espelho (scale -1), bottom esquerda — entra as cores (down) */}
        <div className="absolute bottom-[-6em] left-[-3em] w-[18em] h-auto opacity-90 -scale-100">
          <RainbowBars
            className="aspect-[321/626] w-full"
            variant="curve"
            colors={sideColors}
            strokeWidth={48}
            outline={false}
            direction="down"
            scrub
            duration={1.2}
            stagger={0.075}
          />
        </div>
      </div>

      {/* Top bar: logo */}
      <div className="relative z-10 pt-12 sm:pt-16 flex justify-center">
        <a href="#" data-hero-logo>
          <img
            src="/images/logo.png"
            alt="La Sabore"
            className="h-24 sm:h-32 lg:h-40 w-auto object-contain"
          />
        </a>
      </div>

      {/* Conteúdo: headline | foto pizza (desliza da direita) */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-section grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Headline + logo acima */}
          <div className="text-center lg:text-left">
            <h1
              data-hero-line
              className="display text-[#121212] text-3xl sm:text-5xl lg:text-6xl leading-[0.95]"
            >
              Sua pizza artesanal em{' '}
              <span className="text-[#DC2626]">Miguelópolis</span>
            </h1>
          </div>

          {/* Foto da pizza — desliza da direita, espelhada, com sombra difusa */}
          <div data-hero-photo className="w-full">
            <img
              src="/images/pizza-hero.png"
              alt="Pizza artesanal La Sabore"
              className="w-full max-w-xl lg:max-w-2xl mx-auto lg:ml-auto h-auto object-contain -scale-x-100"
              style={{ filter: 'drop-shadow(0 16px 32px rgba(18,18,18,0.45))' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="relative z-10 pb-8 flex justify-center"
      >
        <div className="animate-bounce-down">
          <ChevronDown size={24} className="text-[#121212]/40" />
        </div>
      </div>
    </section>
  )
}
