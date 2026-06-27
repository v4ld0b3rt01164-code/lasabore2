import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const fadeUp = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.5)] via-[rgba(10,10,10,0.3)] to-[#0a0a0a] z-[1]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80')] bg-cover bg-center z-0" />
      <img src="/images/logo.png" alt="La Sabore" className="absolute top-6 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 z-10 h-16 w-auto object-contain" />
      <div className="relative z-10 container-section text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto"
          {...fadeUp(0.2)}
        >
          A verdadeira pizza italiana
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg text-[rgba(255,255,255,0.65)] max-w-xl mx-auto mb-10 leading-relaxed"
          {...fadeUp(0.35)}
        >
          Feita com ingredientes frescos, massa fermentada naturalmente e assada no forno a lenha
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...fadeUp(0.5)}>
          <a href="#cardapio" className="w-full sm:w-auto bg-[#dc2626] text-white text-base font-semibold px-8 py-4 rounded-lg hover:bg-[#b91c1c] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] text-center transition-all duration-300">Ver Cardápio</a>
          <a href="https://lasaborepizzaria.menudino.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-transparent text-white text-base font-medium px-8 py-4 rounded-lg border border-[rgba(255,255,255,0.25)] hover:border-[#dc2626] hover:text-[#dc2626] text-center transition-all duration-300">Peça Agora</a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-down">
        <ChevronDown size={24} className="text-white/40" />
      </div>
    </section>
  )
}
