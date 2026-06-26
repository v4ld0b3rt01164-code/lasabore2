import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  { stars: 5, text: 'Melhor pizza que já comi! Massa perfeita e atendimento incrível. Virei cliente fiel.', name: 'Maria S.', label: 'Cliente há 2 anos' },
  { stars: 5, text: 'Entrega super rápida e a pizza chegou quentinha. A de quatro queijos é divina!', name: 'João P.', label: 'Cliente há 3 anos' },
  { stars: 5, text: 'Ambiente acolhedor e comida de qualidade. Recomendo demais!', name: 'Ana R.', label: 'Cliente há 1 ano' },
]

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="w-full flex justify-center bg-[#0a0a0a] py-24 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-[#dc2626] mb-3">Depoimentos</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">O que dizem sobre nós</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={card}
              className="bg-[rgba(26,26,26,0.5)] backdrop-blur-xl border border-[rgba(255,255,255,0.07)] rounded-xl p-7 transition-all duration-300 hover:border-[rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.06)]"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={16} className="fill-[#dc2626] text-[#dc2626]" />
                ))}
              </div>
              <p className="text-sm text-[rgba(255,255,255,0.65)] leading-relaxed mb-5 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[rgba(220,38,38,0.2)] flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-[rgba(255,255,255,0.35)]">{r.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
