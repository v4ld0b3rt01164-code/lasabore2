import { MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contato" className="w-full flex justify-center bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.04)] py-16 sm:py-20">
      <div className="container-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="text-center">
            <img src="/images/logo.png" alt="La Sabore" className="h-14 w-auto object-contain mb-3 mx-auto" />
            <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed max-w-xs mx-auto">
              Sua pizza artesanal em Miguelópolis.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[rgba(255,255,255,0.6)] uppercase tracking-wider mb-4">Redes Sociais</h4>
            <div className="flex flex-col gap-3">
              <a href="https://www.instagram.com/lasaboremiguelopolis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.45)] hover:text-[#dc2626] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                @lasaboremiguelopolis
              </a>
              <a href="https://wa.me/5516992315122" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.45)] hover:text-[#dc2626] transition-colors">
                <MessageCircle size={18} className="shrink-0" />
                (16) 99231-5122
              </a>
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
