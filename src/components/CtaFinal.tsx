import { motion } from 'framer-motion'

export default function CtaFinal() {
  return (
    <section
      id="pedido"
      className="w-full flex justify-center bg-[#DC2626] py-24 sm:py-32 relative overflow-hidden"
    >
      {/* decorative circles */}
      <div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full bg-[rgba(255,255,255,0.06)]" />
      <div className="absolute bottom-[-180px] left-[-180px] w-[500px] h-[500px] rounded-full bg-[rgba(0,0,0,0.12)]" />
      <motion.div
        className="relative z-10 container-section text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#F3ECD2]/80 mb-4">
          // pedido
        </span>
        <h2 className="display text-white text-5xl sm:text-7xl md:text-8xl leading-[0.92] mb-6">
          Bateu a fome?
        </h2>
        <p className="text-base sm:text-lg text-[rgba(255,255,255,0.85)] max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Faça seu pedido agora e receba no conforto da sua casa.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://lasaborepizzaria.menudino.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#121212] text-[#F3ECD2] text-sm sm:text-base font-bold px-6 sm:px-10 py-3.5 sm:py-4 rounded-full hover:bg-[#1a1a1a] transition-colors"
          >
            Fazer Pedido
          </a>
          <a
            href="https://wa.me/5516992315122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-transparent text-white text-sm sm:text-base font-bold px-6 sm:px-10 py-3.5 sm:py-4 rounded-full border-2 border-white/40 hover:border-white hover:bg-[rgba(255,255,255,0.1)] transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2c-5.35 0-9.8 4.25-9.8 9.5 0 1.745.488 3.446 1.417 4.932L2.6 21.007l4.684-1.008a9.607 9.607 0 0 0 4.722 1.213c5.35 0 9.8-4.25 9.8-9.5 0-2.602-1.06-5.048-2.929-6.884zm-7.071 14.56a7.89 7.89 0 0 1-4.021-1.118l-.29-.177-2.783.6.594-2.725-.186-.304a7.836 7.836 0 0 1-1.22-4.264c0-4.373 3.579-7.93 7.906-7.93a7.7 7.7 0 0 1 5.483 2.258 7.57 7.57 0 0 1 2.274 5.383c0 4.372-3.58 7.928-7.983 7.928zm4.323-5.7c-.237-.118-1.402-.689-1.62-.768-.218-.079-.376-.118-.534.118-.158.237-.612.768-.75.925-.139.158-.277.178-.514.06-.237-.119-.997-.367-1.899-1.168-.702-.624-1.176-1.394-1.314-1.63-.139-.237-.015-.364.104-.48.106-.106.237-.277.356-.416.118-.139.157-.237.237-.397.079-.158.04-.297-.02-.416-.06-.119-.532-1.29-.728-1.766-.192-.463-.387-.4-.532-.408-.138-.007-.296-.009-.454-.009-.158 0-.415.06-.632.298-.217.237-.829.815-.829 1.985 0 1.17.847 2.3.966 2.46.118.158 1.666 2.563 4.036 3.595.564.245.998.39 1.338.5.56.182 1.074.156 1.48.095.456-.068 1.398-.575 1.595-1.13.198-.555.198-1.031.138-1.13-.059-.099-.217-.158-.454-.277" />
            </svg>
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  )
}
