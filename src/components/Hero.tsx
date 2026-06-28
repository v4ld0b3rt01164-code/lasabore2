import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import RainbowBars from './RainbowBars'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-logo]', { opacity: 0, y: -20, duration: 0.8 })
        .from('[data-hero-line] span', {
          opacity: 0,
          y: 60,
          duration: 1,
          stagger: 0.08,
        }, '-=0.2')
        .from('[data-hero-sub]', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('[data-hero-cta]', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('[data-hero-scroll]', { opacity: 0, duration: 0.6 }, '-=0.2')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const titleLines = ['Sua pizza', 'artesanal em', 'Miguelópolis']

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#d4ed31] flex flex-col"
    >
      {/* Top bar: logo only (badge removed) */}
      <div className="relative z-10 pt-24 sm:pt-28 px-6 sm:px-12 lg:px-20 flex items-start justify-between">
        <a href="#" data-hero-logo>
          <img
            src="/images/logo.png"
            alt="La Sabore"
            className="h-16 sm:h-20 w-auto object-contain"
          />
        </a>
      </div>

      {/* Headline + bars split */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-section grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center">
          {/* Headline */}
          <div className="order-2 lg:order-1">
            <h1
              data-hero-line
              className="display text-[#121212] text-[14vw] sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.92]"
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line === 'Miguelópolis' ? (
                    <span className="text-[#DC2626]">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
            <p
              data-hero-sub
              className="mt-6 text-base sm:text-lg text-[#121212]/65 max-w-md leading-relaxed font-medium"
            >
              Massa de fermentação lenta, ingredientes frescos e o sabor
              italiano feito à mão, todos os dias.
            </p>
            <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#sabores"
                className="inline-flex items-center bg-[#DC2626] text-white text-sm sm:text-base font-bold px-7 py-3.5 rounded-full hover:bg-[#EA384C] transition-colors"
              >
                Ver sabores
              </a>
              <a
                href="https://lasaborepizzaria.menudino.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#121212] border border-[#121212]/25 px-7 py-3.5 rounded-full hover:border-[#121212] transition-colors"
              >
                Peça agora
              </a>
            </div>
          </div>

          {/* Rainbow bars: 3 wide L-curves (italian flag), no outline rectangle */}
          <div className="order-1 lg:order-2 w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
            <RainbowBars
              className="aspect-[321/626] w-full"
              variant="curve"
              colors={['#009246', '#FFFFFF', '#DC2626']}
              strokeWidth={96}
              outline={false}
              direction="down"
              scrub
              duration={1.2}
              stagger={0.08}
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
