import { motion } from 'framer-motion'
import { Bike, MapPin, ShieldCheck } from 'lucide-react'
import RainbowBars from './RainbowBars'

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
    accent: '#F97028',
  },
  {
    icon: MapPin,
    title: 'Área de Cobertura',
    desc: 'Entregamos em todos os bairros e nos ranchos.',
    accent: '#F489A3',
  },
  {
    icon: ShieldCheck,
    title: 'Pagamento Seguro',
    desc: 'Cartão, dinheiro, PIX e vale-refeição. Tudo online.',
    accent: '#F0BB0D',
  },
]

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

export default function Entrega() {
  return (
    <section
      id="entrega"
      className="relative w-full flex justify-center border-t border-[#121212]/10 py-24 sm:py-28 overflow-hidden"
    >
      <div className="container-section relative z-10">
        <div className="mb-12 sm:mb-16 max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#DC2626] mb-4">
            // entrega
          </span>
          <h2 className="display text-[#121212] text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-5">
            Peça pelo site ou WhatsApp
          </h2>
          <p className="text-base text-[#121212]/65 font-medium">
            E acompanhe seu pedido em tempo real, do forno à sua casa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={card}
              className="group bg-white/75 border border-[#121212]/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-[#121212]/25 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${item.accent}22` }}
              >
                <item.icon size={22} style={{ color: item.accent }} />
              </div>
              <h3 className="display text-[#121212] text-2xl mb-3">{item.title}</h3>
              <p className="text-sm text-[#121212]/65 leading-relaxed font-medium">
                {item.desc}
              </p>
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
