import { MapPin, Phone, Clock } from 'lucide-react'

export default function Localizacao() {
  return (
    <section id="localizacao" className="w-full flex justify-center bg-[rgba(13,13,13,0.85)] border-t border-[rgba(255,255,255,0.03)] py-24 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-12">
          <span className="inline-block text-lg highlight text-[#dc2626] mb-3">onde estamos</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Localização</h2>
        </div>
        <div className="max-w-xl mx-auto mb-10 rounded-xl overflow-hidden">
          <img src="/images/localizacao.jpg" alt="Localização La Sabore" className="w-full h-auto object-cover" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-8 sm:gap-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(220,38,38,0.1)] flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-[#dc2626]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Endereço</p>
              <p className="text-sm text-[rgba(255,255,255,0.55)]">Av. Leopoldo Carlos de Oliveira, 668</p>
              <p className="text-sm text-[rgba(255,255,255,0.55)]">Centro - Miguelópolis - SP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(220,38,38,0.1)] flex items-center justify-center shrink-0">
              <Phone size={20} className="text-[#dc2626]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Telefone</p>
              <p className="text-sm text-[rgba(255,255,255,0.55)]">(16) 99231-5122</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[rgba(220,38,38,0.1)] flex items-center justify-center shrink-0">
              <Clock size={20} className="text-[#dc2626]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Horários</p>
              <p className="text-sm text-[rgba(255,255,255,0.55)]">Seg - Sáb: 18h às 23h</p>
              <p className="text-sm text-[rgba(255,255,255,0.55)]">Dom: 12h às 22h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}