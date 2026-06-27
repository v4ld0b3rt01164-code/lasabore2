import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function CtaFinal() {
  return (
    <section id="pedido" className="w-full flex justify-center bg-gradient-to-br from-[#dc2626] to-[#991b1b] py-28 sm:py-32 relative overflow-hidden">
      <div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full bg-[rgba(255,255,255,0.06)]" />
      <div className="absolute bottom-[-180px] left-[-180px] w-[500px] h-[500px] rounded-full bg-[rgba(0,0,0,0.08)]" />
      <motion.div
        className="relative z-10 container-section text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">Bateu a fome?</h2>
        <p className="text-base sm:text-lg text-[rgba(255,255,255,0.85)] max-w-xl mx-auto mb-10 leading-relaxed">
          Faça seu pedido agora e receba no conforto da sua casa
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href="https://lasaborepizzaria.menudino.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white text-[#dc2626] text-xs sm:text-base font-bold px-4 sm:px-10 py-2.5 sm:py-4 rounded-lg hover:bg-[#f5f5f5] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] text-center transition-all duration-300">Fazer Pedido</a>
          <a href="https://wa.me/5516992315122" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white text-xs sm:text-base font-semibold px-4 sm:px-10 py-2.5 sm:py-4 rounded-lg border-2 border-[rgba(255,255,255,0.35)] hover:border-white hover:bg-[rgba(255,255,255,0.1)] text-center transition-all duration-300">
            <MessageCircle size={20} /> WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  )
}
