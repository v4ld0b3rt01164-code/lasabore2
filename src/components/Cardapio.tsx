import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cardapio from '../data/cardapio-limpo.json'

const allPizzas = cardapio.categories.find(c => c.title === 'Pizzas')?.items ?? []

const catEmoji: Record<string, string> = {
  Pizzas: '🍕',
  'Pizzas Doces': '🍫',
  Porções: '🥩',
  Bebidas: '🥤',
}

const cats = [
  {
    id: 'Pizzas',
    label: 'Pizzas',
    items: allPizzas.filter(i => !i.description?.startsWith('Creme de leite')),
  },
  {
    id: 'Pizzas Doces',
    label: 'Pizzas Doces',
    items: allPizzas.filter(i => i.description?.startsWith('Creme de leite')),
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
    <div className="flex justify-center border-b border-[rgba(0,0,0,0.1)]">
      {cats.map(c => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`px-4 sm:px-6 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 ${
            active === c.id
              ? 'text-[#dc2626] border-[#dc2626]'
              : 'text-[rgba(0,0,0,0.5)] border-transparent hover:text-black'
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
    <section id="cardapio" className="w-full flex justify-center border-t border-[rgba(255,255,255,0.03)] py-24 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-16">
          <span className="inline-block text-lg highlight text-white bg-[#dc2626] px-2 py-0.5 rounded mb-3">cardápio</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Nosso Cardápio</h2>
        </div>
        {active ? (
          <>
            <div className="mb-8">
              <Tabs active={active} onSelect={setActive} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={gridAnim}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
              >
                {items.map(item => (
                  <motion.div
                    key={item.name}
                    variants={cardAnim}
                    className="bg-white border border-black rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    {item.image ? (
                      <div className="w-full h-20 sm:h-24 bg-white">
                        <img src={item.image} alt={item.name} className="block w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-20 sm:h-24 bg-[rgba(0,0,0,0.03)] flex items-center justify-center">
                        <span className="text-2xl">{catEmoji[active!]}</span>
                      </div>
                    )}
                    <div className="p-2 sm:p-3">
                      <h3 className="text-[11px] sm:text-sm font-semibold text-black leading-tight mb-0.5">{item.name}</h3>
                      {item.description && (
                        <p className="text-[10px] sm:text-xs text-[rgba(0,0,0,0.5)] leading-relaxed mb-1">{item.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="mt-8">
              <Tabs active={active} onSelect={setActive} />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <button onClick={() => setActive('Pizzas')} className="bg-[#dc2626] text-white text-base font-semibold px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)]">Ver Cardápio</button>
          </div>
        )}
      </div>
    </section>
  )
}
