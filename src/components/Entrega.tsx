import { motion } from 'framer-motion'
import { Bike, MapPin, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import RainbowBars from './RainbowBars'
import { isSafari } from '../lib/is-safari'

// Bandeira italiana — 9 barras para a perspectiva 3D (exceção: mantém 9)
const verticalColors = [
  '#009246', '#009246', '#009246',
  '#FFFFFF', '#FFFFFF', '#FFFFFF',
  '#DC2626', '#DC2626', '#DC2626',
]

const items = [
  {
    icon: Bike,
    title: 'Delivery Rápido',
    desc: 'Sua pizza chega quentinha, do forno à sua porta.',
    accent: '#DC2626',
  },
  {
    icon: MapPin,
    title: 'Área de Cobertura',
    desc: 'Entregamos em todos os bairros e nos ranchos.',
    accent: '#DC2626',
  },
  {
    icon: ShieldCheck,
    title: 'Pagamento Seguro',
    desc: 'Cartão, dinheiro, PIX e vale-refeição. Tudo online.',
    accent: '#DC2626',
  },
]

const card = {
  hidden: { y: 24 },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

export default function Entrega() {
  const [safari, setSafari] = useState(false)

  useEffect(() => {
    setSafari(isSafari())
  }, [])

  return (
    <section
      id="entrega"
      className="relative w-full flex justify-center border-t border-[#121212]/10 py-24 sm:py-28 overflow-hidden"
    >
      <div className="container-section relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 mb-14 sm:mb-18">
          {/* Texto centralizado entre si */}
          <div className="max-w-2xl text-center">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#DC2626] mb-4">
              // entrega
            </span>
            <h2 className="display text-black text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-5">
              Peça pelo site ou WhatsApp
            </h2>
            <p className="text-base text-black/65 font-medium">
              E acompanhe seu pedido em tempo real, do forno à sua casa.
            </p>
          </div>

          {/* Animação delivery.webm integrada ao fundo */}
          <div className="relative w-[150px] h-[150px] shrink-0 ml-[-40px] sm:ml-[-50px] lg:ml-[-60px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/images/delivery.apng" type="image/apng" />
              {!safari && <source src="/images/delivery.webm" type="video/webm" />}
            </video>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={card}
              style={{ opacity: 1 }}
              className="group relative flex items-stretch bg-[#FFF8E1] text-black rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Recortes vintage nos cantos */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath:
                    'polygon(0 10px, 10px 10px, 10px 0, calc(100% - 10px) 0, calc(100% - 10px) 10px, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 10px calc(100% - 10px), 0 calc(100% - 10px))',
                  boxShadow: 'inset 0 0 0 1px rgba(18,18,18,0.12)',
                }}
              />

              {/* Lado do ícone */}
              <div
                className="relative z-10 flex w-20 sm:w-24 shrink-0 items-center justify-center border-r-[2.5px] border-dashed border-black/20"
                style={{ backgroundColor: `${item.accent}12` }}
              >
                <item.icon size={28} style={{ color: item.accent }} />
              </div>

              {/* Lado do texto */}
              <div className="relative z-10 flex-1 px-5 py-5">
                <h3 className="display text-xl mb-1">{item.title}</h3>
                <p className="text-sm text-black/65 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* rainbow-vertical__3 — 9 barras italianas com perspectiva 3D (efeito piso) */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-0 w-full max-w-[280px] sm:max-w-[380px] md:max-w-[452px]" style={{ perspective: '25em' }}>
        <div className="h-24 sm:h-36 md:h-48" style={{ transformStyle: 'preserve-3d', transformOrigin: 'top center' }}>
          <div className="h-full w-full" style={{ transform: 'rotateX(45deg)' }}>
            <RainbowBars
              className="w-full h-full"
              variant="straight"
              colors={verticalColors}
              strokeWidth={48}
              outline={false}
              direction="down"
              scrub
              duration={0.5}
              stagger={0.075}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
