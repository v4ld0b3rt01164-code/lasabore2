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
      tl.fromTo('[data-hero-logo]', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo('[data-hero-line]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.2')
        .fromTo('[data-hero-chef]', { opacity: 0, x: '100vw' }, { opacity: 1, x: 0, duration: 1.3, ease: 'power3.out' }, '+=0.2')
        .fromTo('[data-hero-pizza]', { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.8')
        .fromTo('[data-hero-scroll]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#f0bb0d] flex flex-col"
    >
      {/* rainbow-sides: par de L-curvas espelhadas (decorativo, topo) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* right — topo direita — entra as cores (down) */}
        <div className="hero-rainbow absolute top-6 sm:top-2 md:top-0 right-[-1em] sm:right-[-2em] md:right-[-3em] w-[10em] sm:w-[14em] md:w-[18em] h-auto opacity-90">
          <RainbowBars
            className="aspect-[321/626] w-full"
            variant="curve"
            colors={sideColors}
            strokeWidth={48}
            outline={false}
            direction="up"
            scrub
            scrollStart="top top"
            scrollEnd="bottom center"
            duration={1.2}
            stagger={0.075}
          />
        </div>
        {/* left — espelho (scale -1), bottom esquerda — entra as cores (down) */}
        <div className="hero-rainbow absolute bottom-[-3em] sm:bottom-[-4em] md:bottom-[-6em] left-[-1em] sm:left-[-2em] md:left-[-3em] w-[10em] sm:w-[14em] md:w-[18em] h-auto opacity-90 -scale-100">
          <RainbowBars
            className="aspect-[321/626] w-full"
            variant="curve"
            colors={sideColors}
            strokeWidth={48}
            outline={false}
            direction="up"
            scrub
            scrollStart="top top"
            scrollEnd="bottom center"
            duration={1.2}
            stagger={0.075}
          />
        </div>
      </div>

      {/* Conteúdo: logo + headline | pizza */}
      <div className="relative z-10 flex-1 flex items-center pt-0 sm:pt-16 lg:pt-24">
        <div className="container-section grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Logo + headline */}
          <div className="text-center flex flex-col items-center -mt-4 sm:mt-0">
            {/* Logo + Chef agrupados e centralizados */}
            <div data-hero-logo className="flex items-center justify-center gap-0 opacity-0 pl-10 lg:pl-16">
              <a href="#">
                <img
                  src="/images/logo-hero.webp"
                  alt="La Sabore"
                  className="h-36 sm:h-40 lg:h-44 w-auto object-contain"
                />
              </a>
              <div data-hero-chef className="ml-[-80px] lg:ml-[-120px] w-[250px] h-[250px] opacity-0">
                <img
                  src="/images/Chef.svg"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1
              data-hero-line
            className="display text-[#121212] text-3xl sm:text-5xl lg:text-6xl leading-[0.95] mt-3 sm:mt-4 opacity-0"
          >
            <span className="whitespace-nowrap">Sua pizza artesanal em</span><br />
              <span className="text-[#DC2626]">Miguelópolis</span>
            </h1>
          </div>

          {/* Pizza hero */}
          <div data-hero-pizza className="w-full flex justify-center lg:justify-end opacity-0">
            <img
              src="/images/pizza-hero.webp"
              alt="Pizza artesanal La Sabore"
              className="w-full max-w-[364px] sm:max-w-[416px] lg:max-w-[749px] xl:max-w-[874px] h-auto object-contain -scale-x-100"
              style={{ filter: 'drop-shadow(4px 4px 2px rgba(18,18,18,0.6))' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="relative z-10 pb-8 flex justify-center opacity-0"
      >
        <div className="animate-bounce-down">
          <ChevronDown size={24} className="text-[#121212]/40" />
        </div>
      </div>

    </section>
  )
}
