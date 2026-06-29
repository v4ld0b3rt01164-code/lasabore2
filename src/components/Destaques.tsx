import { motion } from 'framer-motion'
import { Flame, Heart, Leaf } from 'lucide-react'
import RainbowBars from './RainbowBars'

const items = [
  {
    icon: Flame,
    title: 'Massa Artesanal',
    desc: 'Preparada com fermentação lenta e cuidado em cada detalhe, para uma borda leve e crocante.',
    accent: '#F97028',
  },
  {
    icon: Heart,
    title: 'Ambiente Familiar',
    desc: 'Espaço kids preparado para receber toda a família com conforto e boas histórias.',
    accent: '#F489A3',
  },
  {
    icon: Leaf,
    title: 'Ingredientes Frescos',
    desc: 'Selecionados diariamente, sem conservantes artificiais. O sabor que vem da horta.',
    accent: '#F0BB0D',
  },
]

const card = {
  hidden: { y: 32 },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

export default function Destaques() {
  return (
    <section className="relative w-full flex justify-center border-t border-[#121212]/10 py-24 sm:py-28 overflow-hidden">
      {/* 9 bars on the right edge (italian flag, straight, scrub) */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 pointer-events-none opacity-90">
        <RainbowBars
          className="w-full h-full"
          variant="straight"
          colors={['#009246', '#FFFFFF', '#DC2626']}
          strokeWidth={48}
          outline={false}
          direction="down"
          scrub
          duration={0.6}
          stagger={0.0375}
        />
      </div>

      <div className="container-section relative z-10">
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#DC2626] mb-4">
            // diferenciais
          </span>
          <h2 className="display text-[#121212] text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
            O que torna a La Sabore <span className="text-[#DC2626]">única</span>
          </h2>
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
              style={{ opacity: 1 }}
              className="group bg-white/75 border border-[#121212]/10 rounded-2xl p-6 sm:p-8 transition-colors duration-300 hover:border-[#121212]/25 hover:-translate-y-1"
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
    </section>
  )
}
