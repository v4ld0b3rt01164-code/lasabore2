import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cardapio from '../data/cardapio-limpo.json'

const catMap: Record<string, string> = {
  CERVEJA: 'Cervejas',
  Porções: 'Porções',
  Pizzas: 'Pizzas',
  Refrigerantes: 'Bebidas',
}

const cats = cardapio.categories.map(c => c.title)

const gridAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const cardAnim = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

export default function Cardapio() {
  const [active, setActive] = useState(cats[2])

  const activeCat = cardapio.categories.find(c => c.title === active)
  const items = activeCat?.items ?? []

  return (
    <section id="cardapio" className="w-full flex justify-center bg-[#0d0d0d] border-t border-[rgba(255,255,255,0.03)] py-24 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.12em] text-[#dc2626] mb-3">Cardápio</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Nosso Cardápio</h2>
          <p className="text-sm sm:text-base text-[rgba(255,255,255,0.55)] mt-4">Escolha sua favorita e faça seu pedido</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === c
                  ? 'bg-[#dc2626] text-white border border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                  : 'bg-transparent text-[rgba(255,255,255,0.45)] border border-[rgba(255,255,255,0.1)] hover:text-white hover:border-[rgba(255,255,255,0.2)]'
              }`}
            >
              {catMap[c] || c}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={gridAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map(item => (
              <motion.div
                key={item.name}
                variants={cardAnim}
                className="bg-[rgba(26,26,26,0.5)] backdrop-blur-xl border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(220,38,38,0.3)] hover:-translate-y-1"
              >
                {item.image ? (
                  <img src={item.image} alt={item.name} loading="lazy" className="w-full h-44 sm:h-48 object-cover" />
                ) : (
                  <div className="w-full h-44 sm:h-48 bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
                    <span className="text-3xl">🍕</span>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed mb-3 line-clamp-2">{item.description}</p>
                  )}
                  <span className="text-xl font-bold text-[#dc2626]">{item.price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
