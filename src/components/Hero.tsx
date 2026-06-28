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
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.5)] via-[rgba(10,10,10,0.3)] to-transparent z-[1]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1080&q=60')] bg-cover bg-center z-0" />
      <img src="/images/logo.png" alt="La Sabore" className="absolute top-2 left-1/2 -translate-x-1/2 sm:left-16 sm:translate-x-0 z-10 h-24 w-auto object-contain" />
      <div className="relative z-10 container-section text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto"
          {...fadeUp(0.2)}
        >
          Sua pizza artesanal em Miguelópolis
        </motion.h1>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-down">
        <ChevronDown size={24} className="text-white/40" />
      </div>
    </section>
  )
}
