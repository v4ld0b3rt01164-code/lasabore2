import { MessageCircle } from 'lucide-react'

const links = [
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Entrega', href: '#entrega' },
  { label: 'Sobre', href: '#sobre' },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lasaboremiguelopolis/',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5516992315122',
    svg: <MessageCircle size={18} />,
  },
]

export default function Footer() {
  return (
    <footer id="contato" className="w-full flex justify-center bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.04)] py-16 sm:py-20">
      <div className="container-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <img src="/images/logo.png" alt="La Sabore" className="h-12 w-auto object-contain mb-3 mx-auto sm:mx-0" />
            <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed max-w-xs mx-auto sm:mx-0">
              Sua pizza artesanal em Miguelópolis.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[rgba(255,255,255,0.6)] uppercase tracking-wider mb-4">Navegação</h4>
            <div className="flex flex-col gap-3">
              {links.map(l => (
                <a key={l.label} href={l.href} className="text-sm text-[rgba(255,255,255,0.45)] hover:text-[#dc2626] transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[rgba(255,255,255,0.6)] uppercase tracking-wider mb-4">Horários</h4>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-[rgba(255,255,255,0.45)]">Seg - Sáb: 18h às 23h</span>
              <span className="text-sm text-[rgba(255,255,255,0.45)]">Dom: 12h às 22h</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[rgba(255,255,255,0.6)] uppercase tracking-wider mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center hover:bg-[#dc2626] hover:border-[#dc2626] transition-all duration-200">
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.04)] text-center">
          <p className="text-xs text-[rgba(255,255,255,0.25)]">© 2026 La Sabore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
