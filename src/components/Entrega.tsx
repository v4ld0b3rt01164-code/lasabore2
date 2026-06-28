import { motion } from 'framer-motion'
import { Bike, MapPin, ShieldCheck } from 'lucide-react'

const items = [
  { icon: Bike, title: 'Delivery Rápido', desc: 'Sua pizza chega quentinha, do forno à sua porta.' },
  { icon: MapPin, title: 'Área de Cobertura', desc: 'Entregamos em todos os bairros e nos ranchos.' },
  { icon: ShieldCheck, title: 'Pagamento Seguro', desc: 'Aceitamos cartão, dinheiro, PIX e vale-refeição. Tudo online.' },
]

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

export default function Entrega() {
  return (
    <section id="entrega" className="w-full flex justify-center py-24 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-16">
          <span className="inline-block text-lg highlight text-white bg-[#dc2626] px-2 py-0.5 rounded mb-3">entrega</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Receba em casa</h2>
          <p className="text-sm sm:text-base text-[rgba(0,0,0,0.6)] mt-4 max-w-2xl mx-auto">Peça pelo site ou WhatsApp e acompanhe seu pedido em tempo real</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-16">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={card}
              className="bg-white border border-black rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(220,38,38,0.1)] flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <item.icon size={20} className="text-[#dc2626]" />
              </div>
              <h3 className="text-base font-semibold text-black mb-1 text-center sm:text-left">{item.title}</h3>
              <p className="text-sm text-[rgba(0,0,0,0.6)] leading-relaxed text-center sm:text-left">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      
      </div>
    </section>
  )
}
