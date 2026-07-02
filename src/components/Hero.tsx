export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-bg pt-16">
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

      {/* Vídeo HERO — height fluído pelo aspect ratio do vídeo (nunca corta a cena).
          Mobile (até 1023px): hero-mobile.mp4 (9:16)
          Desktop (>= 1024px): hero-pc.mp4 (16:9)
          pt-16 compensa o navbar fixo (h-16 = 4rem).
      */}
      <video
        className="block w-full h-auto aspect-[9/16] object-contain lg:hidden"
        autoPlay
        muted
        playsInline
        aria-label="Apresentação La Sabore"
      >
        <source src="/images/hero-mobile.mp4" type="video/mp4" />
      </video>
      <video
        className="block w-full h-auto aspect-video object-contain hidden lg:block"
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
