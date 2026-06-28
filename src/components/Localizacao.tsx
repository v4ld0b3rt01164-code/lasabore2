import { MapPin, Phone, Clock } from 'lucide-react'

const items = [
  {
    icon: MapPin,
    title: 'Endereço',
    lines: ['Av. Leopoldo Carlos de Oliveira, 668', 'Centro · Miguelópolis · SP'],
    accent: '#F97028',
  },
  {
    icon: Phone,
    title: 'Telefone',
    lines: ['(16) 99231-5122'],
    accent: '#F489A3',
    href: 'https://wa.me/5516992315122',
  },
  {
    icon: Clock,
    title: 'Horários',
    lines: ['Seg a Sáb · 18h às 23h', 'Dom · 12h às 22h'],
    accent: '#F0BB0D',
  },
]

export default function Localizacao() {
  return (
    <section
      id="contato"
      className="w-full flex justify-center border-t border-[#121212]/10 py-24 sm:py-28"
    >
      <div className="container-section">
        <div className="mb-10 sm:mb-12 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#DC2626] mb-4">
            // onde estamos
          </span>
          <h2 className="display text-[#121212] text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
            Venha nos <span className="text-[#DC2626]">visitar</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-[#121212]/10">
          <img
            src="/images/localizacao.jpg"
            alt="Fachada La Sabore Pizzaria"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {items.map(item => {
            const Inner = (
              <>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.accent}22` }}
                >
                  <item.icon size={20} style={{ color: item.accent }} />
                </div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#121212]/55 mb-2">
                  {item.title}
                </p>
                {item.lines.map((line, i) => (
                  <p
                    key={i}
                    className={`text-sm font-medium leading-relaxed ${
                      i === 0 ? 'text-[#121212]' : 'text-[#121212]/65'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </>
            )
            return item.href ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-[#121212]/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-[#121212]/25 hover:-translate-y-1"
              >
                {Inner}
              </a>
            ) : (
              <div
                key={item.title}
                className="bg-white border border-[#121212]/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-[#121212]/25"
              >
                {Inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
