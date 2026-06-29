import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
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
    label: 'Doces',
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
  animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const cardAnim = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

function Tabs({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {cats.map(c => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`px-4 sm:px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-200 border ${
            active === c.id
              ? 'bg-[#121212] text-[#f0bb0d] border-[#121212]'
              : 'bg-transparent text-[#121212]/70 border-[#121212]/15 hover:border-[#121212]/40'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

export default function Cardapio() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('Pizzas')

  const activeCat = cats.find(c => c.id === active)
  const items = activeCat?.items ?? []

  return (
    <section
      id="sabores"
      className="w-full flex justify-center border-t border-[#121212]/10 py-24 sm:py-28"
    >
      <div className="container-section">
        <div className="mb-10 sm:mb-12 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#DC2626] mb-4">
            // sabores
          </span>
          <h2 className="display text-[#121212] text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-8">
            O forno está aceso
          </h2>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center bg-[#DC2626] text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-full hover:bg-[#EA384C] transition-colors"
          >
            Ver Cardápio
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[rgba(18,18,18,0.6)] backdrop-blur-sm"
            />
            {/* Drawer slides from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.625, 0.05, 0, 1], duration: 0.5 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-[#f0bb0d] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-[#f0bb0d]/95 backdrop-blur-md border-b border-[#121212]/10 px-5 sm:px-8 py-4 flex items-center justify-between">
                <span className="display text-2xl text-[#121212]">Cardápio</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#121212]/5 hover:bg-[#121212]/10 transition-colors"
                >
                  <X size={20} className="text-[#121212]" />
                </button>
              </div>

              <div className="px-5 sm:px-8 py-6">
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
                    className="grid grid-cols-2 gap-3 sm:gap-4"
                  >
                    {items.map(item => (
                      <motion.div
                        key={item.name}
                        variants={cardAnim}
                        className="group bg-[#f0bb0d] border border-[#121212]/10 rounded-xl overflow-hidden transition-colors duration-300 hover:border-[#121212]/30 hover:-translate-y-1 flex flex-col"
                      >
                        {(item.image || catEmoji[active]) && (
                          <div className="w-full h-32 bg-[#f5f5f5] overflow-hidden shrink-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-4xl opacity-80">{catEmoji[active]}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-4 flex-1">
                          <h3 className="text-sm font-bold text-[#121212] leading-tight mb-1">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-[#121212]/65 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8">
                  <Tabs active={active} onSelect={setActive} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
