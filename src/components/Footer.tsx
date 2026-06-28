export default function Footer() {
  return (
    <footer id="contato" className="w-full flex justify-center border-t border-[rgba(255,255,255,0.04)] py-16 sm:py-20">
      <div className="container-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="text-center">
            <img src="/images/logo.png" alt="La Sabore" className="h-14 w-auto object-contain mb-3 mx-auto" />
            <p className="text-sm text-[rgba(0,0,0,0.5)] leading-relaxed max-w-xs mx-auto">
              Sua pizza artesanal em Miguelópolis.
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-3 mt-6 sm:mt-0">
              <a href="https://www.instagram.com/lasaboremiguelopolis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[rgba(0,0,0,0.5)] hover:text-[#dc2626] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                @lasaboremiguelopolis
              </a>
              <a href="https://wa.me/5516992315122" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[rgba(0,0,0,0.5)] hover:text-[#dc2626] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2c-5.35 0-9.8 4.25-9.8 9.5 0 1.745.488 3.446 1.417 4.932L2.6 21.007l4.684-1.008a9.607 9.607 0 0 0 4.722 1.213c5.35 0 9.8-4.25 9.8-9.5 0-2.602-1.06-5.048-2.929-6.884zm-7.071 14.56a7.89 7.89 0 0 1-4.021-1.118l-.29-.177-2.783.6.594-2.725-.186-.304a7.836 7.836 0 0 1-1.22-4.264c0-4.373 3.579-7.93 7.906-7.93a7.7 7.7 0 0 1 5.483 2.258 7.57 7.57 0 0 1 2.274 5.383c0 4.372-3.58 7.928-7.983 7.928zm4.323-5.7c-.237-.118-1.402-.689-1.62-.768-.218-.079-.376-.118-.534.118-.158.237-.612.768-.75.925-.139.158-.277.178-.514.06-.237-.119-.997-.367-1.899-1.168-.702-.624-1.176-1.394-1.314-1.63-.139-.237-.015-.364.104-.48.106-.106.237-.277.356-.416.118-.139.157-.237.237-.397.079-.158.04-.297-.02-.416-.06-.119-.532-1.29-.728-1.766-.192-.463-.387-.4-.532-.408-.138-.007-.296-.009-.454-.009-.158 0-.415.06-.632.298-.217.237-.829.815-.829 1.985 0 1.17.847 2.3.966 2.46.118.158 1.666 2.563 4.036 3.595.564.245.998.39 1.338.5.56.182 1.074.156 1.48.095.456-.068 1.398-.575 1.595-1.13.198-.555.198-1.031.138-1.13-.059-.099-.217-.158-.454-.277" /></svg>
                (16) 99231-5122
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.04)] text-center">
          <p className="text-xs text-[rgba(0,0,0,0.35)]">© 2026 La Sabore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
