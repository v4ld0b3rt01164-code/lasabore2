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
        .from('[data-hero-scroll]', { opacity: 0, duration: 0.6 }, '-=0.2')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#c9a87c] flex flex-col"
      style={{ backgroundImage: 'url(/images/bg-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* rainbow-sides: par de L-curvas espelhadas (decorativo, topo) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* right — topo direita — entra as cores (down) */}
        <div className="absolute top-6 sm:top-2 md:top-0 right-[-1em] sm:right-[-2em] md:right-[-3em] w-[10em] sm:w-[14em] md:w-[18em] h-auto opacity-90">
          <RainbowBars
            className="aspect-[321/626] w-full"
            variant="curve"
            colors={sideColors}
            strokeWidth={48}
            outline={false}
            direction="down"
            scrub
            scrollStart="top top"
            duration={1.2}
            stagger={0.075}
          />
        </div>
        {/* left — espelho (scale -1), bottom esquerda — entra as cores (down) */}
        <div className="absolute bottom-[-3em] sm:bottom-[-4em] md:bottom-[-6em] left-[-1em] sm:left-[-2em] md:left-[-3em] w-[10em] sm:w-[14em] md:w-[18em] h-auto opacity-90 -scale-100">
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

      {/* Conteúdo: logo + headline à esquerda */}
      <div className="relative z-10 flex-1 flex items-center pt-20 sm:pt-24">
        <div className="container-section text-left">
          <a href="#" data-hero-logo>
            <img
              src="/images/logo.png"
              alt="La Sabore"
              className="h-32 sm:h-44 lg:h-60 w-auto object-contain"
            />
          </a>
          <h1
            data-hero-line
            className="display text-[#121212] text-3xl sm:text-5xl lg:text-6xl leading-[0.95] mt-4 sm:mt-6"
          >
            Sua pizza artesanal em{' '}
            <span className="text-[#DC2626]">Miguelópolis</span>
          </h1>
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
