import { motion } from 'framer-motion'
import RainbowBars from './RainbowBars'

const fadeIn = (dir: 'left' | 'right') => ({
  initial: { opacity: 0, x: dir === 'left' ? -30 : 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
})

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="relative w-full flex justify-center border-t border-[#121212]/10 py-24 sm:py-28 overflow-hidden"
    >
      {/* 9 bars on the left edge (italian flag, straight, scrub) */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 pointer-events-none opacity-90 hidden md:block">
        <RainbowBars
          className="w-full h-full"
          variant="straight"
          colors={[
            '#009246', '#009246', '#009246',
            '#FFFFFF', '#FFFFFF', '#FFFFFF',
            '#DC2626', '#DC2626', '#DC2626',
          ]}
          strokeWidth={48}
          outline={false}
          direction="up"
          scrub
          duration={0.6}
          stagger={0.0375}
        />
      </div>

      <div className="container-section relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div {...fadeIn('left')}>
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#DC2626] mb-4">
            // sobre nós
          </span>
          <h2 className="display text-[#121212] text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-8">
            Uma paixão que virou <span className="text-[#DC2626]">tradição</span>
          </h2>

          <div className="space-y-5 text-[#121212]/70 leading-relaxed font-medium">
            <p>
              Acreditamos que uma pizza de verdade é feita com{' '}
              <span className="text-[#121212] highlight">paixão</span>. Foi desse
              sentimento que nasceu a La Sabore Pizzaria. Antes de ser um negócio,
              ela era um{' '}
              <span className="text-[#121212] highlight">sonho</span>: levar para
              Miguelópolis uma experiência diferente, com sabores{' '}
              <span className="text-[#121212] highlight">exclusivos</span>,
              ingredientes de qualidade e um cuidado em cada detalhe que a cidade
              ainda não conhecia.
            </p>
            <p>
              Desde o primeiro dia, nosso compromisso sempre foi oferecer pizzas de
              massa fina, preparadas com ingredientes selecionados e um sabor que faz
              cada momento à mesa ser especial. E, para tornar essa experiência ainda
              mais completa, nossas{' '}
              <span className="text-[#121212] highlight">bordas recheadas</span> se
              tornaram um dos grandes{' '}
              <span className="text-[#121212] highlight">diferenciais</span> da La
              Sabore.
            </p>
            <p>
              Mais do que preparar pizzas, buscamos criar{' '}
              <span className="text-[#121212] highlight">momentos</span>. Queremos
              que cada pedido reúna famílias, amigos e boas histórias ao redor da
              mesa.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#121212]/10">
            <p className="display text-2xl text-[#121212]">La Sabore Pizzaria</p>
            <p className="text-sm text-[#121212]/55 mt-1">
              Feita com{' '}
              <span className="text-[#DC2626] highlight">paixão</span>. Servida com{' '}
              <span className="text-[#DC2626] highlight">sabor</span>.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <img
            src="/images/sobre.jpg"
            alt="Pizzaiolo preparando massa artesanal"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
