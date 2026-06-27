export default function CtaCardapio() {
  return (
    <section className="w-full flex justify-center bg-[#0a0a0a] py-24 sm:py-28">
      <div className="container-section text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#dc2626] mb-4">Bateu a fome?</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
          Faça seu pedido agora e receba em até 30 minutos na sua casa
        </h2>
        <a
          href="https://lasaborepizzaria.menudino.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#dc2626] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-colors text-sm"
        >
          Fazer Pedido
        </a>
      </div>
    </section>
  )
}