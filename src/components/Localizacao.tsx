import { MapPin, Phone, Clock } from 'lucide-react'

export default function Localizacao() {
  return (
    <section id="localizacao" className="w-full flex justify-center border-t border-[rgba(255,255,255,0.03)] py-24 sm:py-28">
      <div className="container-section">
        <div className="text-center mb-12">
          <span className="inline-block text-lg highlight text-white bg-[#dc2626] px-2 py-0.5 rounded mb-3">onde estamos</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Localização</h2>
        </div>
        <div className="max-w-xl mx-auto mb-10 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)] -translate-y-1">
          <img src="/images/localizacao.jpg" alt="Localização La Sabore" className="w-full h-auto object-cover" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-6 sm:bg-white/80 sm:rounded-xl sm:p-6">
          <div className="flex items-center gap-3 bg-white/80 rounded-xl p-4 w-full sm:bg-transparent sm:p-0 sm:w-auto">
            <div className="w-10 h-10 rounded-lg bg-[rgba(220,38,38,0.1)] flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-black" />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Endereço</p>
              <p className="text-sm text-[rgba(0,0,0,0.6)]">Av. Leopoldo Carlos de Oliveira, 668</p>
              <p className="text-sm text-[rgba(0,0,0,0.6)]">Centro - Miguelópolis - SP</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/80 rounded-xl p-4 w-full sm:bg-transparent sm:p-0 sm:w-auto">
            <div className="w-10 h-10 rounded-lg bg-[rgba(220,38,38,0.1)] flex items-center justify-center shrink-0">
              <Phone size={20} className="text-black" />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Telefone</p>
              <p className="text-sm text-[rgba(0,0,0,0.6)]">(16) 99231-5122</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/80 rounded-xl p-4 w-full sm:bg-transparent sm:p-0 sm:w-auto">
            <div className="w-10 h-10 rounded-lg bg-[rgba(220,38,38,0.1)] flex items-center justify-center shrink-0">
              <Clock size={20} className="text-black" />
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Horários</p>
              <p className="text-sm text-[rgba(0,0,0,0.6)]">Seg - Sáb: 18h às 23h</p>
              <p className="text-sm text-[rgba(0,0,0,0.6)]">Dom: 12h às 22h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}