import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const links = [
    { label: 'Sabores', href: '#sabores' },
    { label: 'Entrega', href: '#entrega' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Onde estamos', href: '#contato' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-[#121212]">
        <div className="container-section flex items-center justify-between">
          <a href="#" className="display text-[#F3ECD2] text-2xl">
            La&nbsp;Sabore
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-bold text-[#F3ECD2]/80 hover:text-[#F3ECD2] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://lasaborepizzaria.menudino.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center bg-[#DC2626] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#EA384C] transition-colors"
            >
              Peça Agora
            </a>
            <button
              className="md:hidden text-[#F3ECD2]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-[#121212] flex flex-col items-center justify-center gap-8 z-40 md:hidden">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="display text-2xl text-[#F3ECD2] hover:text-[#DC2626] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://lasaborepizzaria.menudino.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#DC2626] text-white text-base font-bold px-10 py-3.5 rounded-full hover:bg-[#EA384C] transition-colors mt-4"
            onClick={() => setMobileOpen(false)}
          >
            Peça Agora
          </a>
        </div>
      )}
    </>
  )
}
