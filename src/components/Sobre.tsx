import { motion } from 'framer-motion'

const fadeIn = (dir: 'left' | 'right') => ({
  initial: { opacity: 0, x: dir === 'left' ? -30 : 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
})

export default function Sobre() {
  return (
    <section id="sobre" className="w-full flex justify-center bg-[#0d0d0d] border-t border-[rgba(255,255,255,0.03)] py-24 sm:py-28">
      <div className="container-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeIn('left')}>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-[#dc2626] mb-3">Sobre Nós</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">Uma paixão que nasceu do forno</h2>
          <p className="text-base text-[rgba(255,255,255,0.55)] leading-relaxed mb-4">
            Há mais de 15 anos, a La Sabore nasceu do sonho de trazer a verdadeira pizza italiana para Miguelópolis. Cada massa é preparada artesanalmente com ingredientes selecionados.
          </p>
          <p className="text-base text-[rgba(255,255,255,0.55)] leading-relaxed">
            Do forno à sua casa, entregamos sabor e qualidade em cada fatia. Venha nos conhecer no Centro de Miguelópolis ou peça pelo nosso cardápio online.
          </p>
          <div className="flex gap-12 mt-10">
            {[
              { v: '15+', l: 'Anos' },
              { v: '50k+', l: 'Pizzas' },
              { v: '4.9', l: 'Avaliação' },
            ].map(s => (
              <div key={s.l}>
                <div className="text-3xl font-bold text-[#dc2626]">{s.v}</div>
                <div className="text-sm text-[rgba(255,255,255,0.45)] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="relative rounded-xl overflow-hidden aspect-[4/5] border border-[rgba(255,255,255,0.07)]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.1 }}
        >
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" alt="Pizzaiolo preparando massa artesanal" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.5)] to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
