import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-bg flex flex-col">
      {/* RainbowBars laterais — desativados para reuso futuro em outras seções.
          Não deletar. Para reativar, descomentar e importar RainbowBars.
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-rainbow absolute top-6 sm:top-2 md:top-0 right-[-1em] sm:right-[-2em] md:right-[-3em] w-[12em] sm:w-[14em] md:w-[18em] h-auto opacity-90">
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
        <div className="hero-rainbow absolute bottom-[-1em] sm:bottom-[-4em] md:bottom-[-6em] left-[-1em] sm:left-[-2em] md:left-[-3em] w-[12em] sm:w-[14em] md:w-[18em] h-auto opacity-90 -scale-100">
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
      */}

      {/* Conteúdo: logo + headline + vídeo (Hero limpo, sem Chef/Pizza/GSAP) */}
      <div className="relative z-10 flex-1 flex items-center pt-0 sm:pt-16 lg:pt-24">
        <div className="container-section flex flex-col items-center text-center gap-6 lg:gap-8">
          {/* Logo */}
          <a href="#">
            <img
              src="/images/logo-hero.webp"
              alt="La Sabore"
              className="h-36 sm:h-40 lg:h-44 w-auto object-contain"
            />
          </a>

          {/* Headline */}
          <h1 className="display text-ink text-3xl sm:text-5xl lg:text-6xl leading-[0.95]">
            <span className="whitespace-nowrap">Sua pizza artesanal em</span>
            <br />
            <span className="text-italia-red">Miguelópolis</span>
          </h1>

          {/* Vídeo — mobile (até 1023px) */}
          <video
            className="w-full max-w-[640px] h-auto object-contain lg:hidden"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/images/hero-mobile.mp4" type="video/mp4" />
          </video>

          {/* Vídeo — desktop (>= 1024px) */}
          <video
            className="w-full max-w-[768px] h-auto object-contain hidden lg:block"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/images/hero-pc.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="animate-bounce-down">
          <ChevronDown size={24} className="text-ink/40" />
        </div>
      </div>
    </section>
  )
}
