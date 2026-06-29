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
    lines: ['Ter a Sex · 18h às 23h', 'Sáb · 18h às 23h59', 'Dom · 18h às 23h'],
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

          <div className="flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-0">
          {items.map((item, index) => (
            <div key={item.title} className="flex items-start">
              {index > 0 && (
                <span className="hidden sm:block text-black mx-6 select-none">|</span>
              )}
              <div className={index === 0 ? '' : ''}>
                <div className="flex items-center gap-3 mb-1">
                  <item.icon size={18} className="text-black shrink-0" />
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-black">
                    {item.title}
                  </p>
                </div>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm font-medium leading-relaxed text-black">{line}</p>
                    ))}
                  </a>
                ) : (
                  item.lines.map((line, i) => (
                    <p key={i} className="text-sm font-medium leading-relaxed text-black">{line}</p>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
