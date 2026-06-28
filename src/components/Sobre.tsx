import { motion } from 'framer-motion'

const fadeIn = (dir: 'left' | 'right') => ({
  initial: { opacity: 0, x: dir === 'left' ? -30 : 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
})

export default function Sobre() {
  return (
    <section id="sobre" className="w-full flex justify-center border-t border-[rgba(255,255,255,0.03)] py-24 sm:py-28">
      <div className="container-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeIn('left')}>
          <span className="inline-block text-lg highlight text-white bg-[#dc2626] px-2 py-0.5 rounded mb-3">sobre nós</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight mb-6">Uma paixão que virou tradição</h2>

          <div className="p-5 sm:p-6 rounded-xl bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)]">
            <div className="space-y-5 text-justify font-semibold text-[rgba(255,255,255,0.85)] leading-relaxed">
            <p>
              Acreditamos que uma pizza de verdade é feita com{' '}
              <span className="text-white highlight text-lg">paixão</span>. Foi desse sentimento que nasceu a La Sabore
              Pizzaria. Antes de ser um negócio, ela era um{' '}
              <span className="text-white highlight text-lg">sonho</span>: levar para Miguelópolis uma experiência
              diferente, com sabores{' '}
              <span className="text-white highlight text-lg">exclusivos</span>, ingredientes de qualidade e um cuidado
              em cada detalhe que a cidade ainda não conhecia.
            </p>

            <p>
              Desde o primeiro dia, nosso compromisso sempre foi oferecer pizzas de massa fina, preparadas com
              ingredientes selecionados e um sabor que faz cada momento à mesa ser especial. E, para tornar essa
              experiência ainda mais completa, nossas{' '}
              <span className="text-white highlight text-lg">bordas recheadas</span> se tornaram um dos grandes
              <span className="text-white highlight text-lg"> diferenciais</span> da La Sabore, conquistando clientes e
              transformando cada fatia em uma surpresa.
            </p>

            <p>
              Mais do que preparar pizzas, buscamos criar{' '}
              <span className="text-white highlight text-lg">momentos</span>. Queremos que cada pedido reúna famílias,
              amigos e boas histórias ao redor da mesa.
            </p>

            <p>
              É essa dedicação que nos inspira todos os dias a inovar, manter a qualidade e oferecer uma experiência
              que vai muito além da pizza.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[rgba(255,255,255,0.1)] text-center">
            <p className="text-lg font-bold text-white">La Sabore Pizzaria</p>
            <p className="text-sm text-[rgba(255,255,255,0.75)] italic">
              Feita com <span className="text-white highlight text-lg">paixão</span>. Servida com{' '}
              <span className="text-white highlight text-lg">sabor</span>.
            </p>
          </div>
        </div>
        </motion.div>
        <motion.div
          className="relative rounded-xl overflow-hidden aspect-[3/5] border border-[rgba(255,255,255,0.07)] shadow-[0_8px_32px_rgba(0,0,0,0.35)] -translate-y-1"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.1 }}
        >
          <img src="/images/sobre.jpg" alt="Pizzaiolo preparando massa artesanal" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.5)] to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
