import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cardapio from '../data/cardapio-limpo.json'

const catEmoji: Record<string, string> = {
  Pizzas: '🍕',
  Porções: '🥩',
  Bebidas: '🥤',
}

const cats = [
  {
    id: 'Pizzas',
    label: 'Pizzas',
    items: cardapio.categories.find(c => c.title === 'Pizzas')?.items ?? [],
  },
  {
    id: 'Porções',
    label: 'Porções',
    items: cardapio.categories.find(c => c.title === 'Porções')?.items ?? [],
  },
  {
    id: 'Bebidas',
    label: 'Bebidas',
    items: [
      ...(cardapio.categories.find(c => c.title === 'CERVEJA')?.items ?? []),
      ...(cardapio.categories.find(c => c.title === 'Refrigerantes')?.items ?? []),
    ],
  },
]

const gridAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const cardAnim = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

function Tabs({ active, onSelect }: { active: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {cats.map(c => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            active === c.id
              ? 'bg-[#dc2626] text-white border border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.3)]'
              : 'bg-transparent text-[rgba(255,255,255,0.45)] border border-[rgba(255,255,255,0.1)] hover:text-white hover:border-[rgba(255,255,255,0.2)]'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

export default function Cardapio() {
  const [active, setActive] = useState<string | null>(null)

  const activeCat = cats.find(c => c.id === active)
  const items = activeCat?.items ?? []

  return (
    <section id="cardapio" className="w-full flex justify-center bg-[rgba(13,13,13,0.7)] border-t border-[rgba(255,255,255,0.03)] py-24 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-16">
          <span className="inline-block text-lg highlight text-[#dc2626] mb-3">cardápio</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Nosso Cardápio</h2>
          <p className="text-sm sm:text-base text-[rgba(255,255,255,0.55)] mt-4">Clique em uma categoria para ver os itens</p>
        </div>
        <div className="mb-12">
          <Tabs active={active} onSelect={setActive} />
        </div>
        {active ? (
          <>
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
                      <div className="w-full h-44 sm:h-48 bg-white">
                        <img src={item.image} alt={item.name} className="block w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-44 sm:h-48 bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
                        <span className="text-5xl">{catEmoji[active!]}</span>
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
            <div className="mt-12">
              <Tabs active={active} onSelect={setActive} />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-white font-semibold text-base">Selecione uma categoria acima para ver o cardápio</p>
          </div>
        )}
      </div>
    </section>
  )
}
