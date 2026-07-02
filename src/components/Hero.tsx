export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-bg">
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

      {/* Vídeo HERO — ocupa toda a extensão da seção.
          Mobile (até 1023px): hero-mobile.mp4
          Desktop (>= 1024px): hero-pc.mp4
      */}
      <video
        className="absolute top-16 inset-x-0 bottom-0 w-full object-cover lg:hidden"
        autoPlay
        muted
        playsInline
        aria-label="Apresentação La Sabore"
      >
        <source src="/images/hero-mobile.mp4" type="video/mp4" />
      </video>
      <video
        className="absolute top-16 inset-x-0 w-full h-[calc(100vh-4rem)] object-cover object-bottom hidden lg:block"
        autoPlay
        muted
        playsInline
        aria-label="Apresentação La Sabore"
      >
        <source src="/images/hero-pc.mp4" type="video/mp4" />
      </video>
    </section>
  )
}
