import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const links = [
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Entrega', href: '#entrega' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-colors duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[rgba(10,10,10,0.92)] border-b border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-section flex items-center justify-between">
        <div />
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="https://lasaborepizzaria.menudino.com" target="_blank" rel="noopener noreferrer" className="hidden md:block bg-[#dc2626] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#b91c1c] transition-colors">Peça Agora</a>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-[rgba(10,10,10,0.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-40">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-xl font-medium text-white hover:text-[#dc2626] transition-colors" onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
          <a href="https://lasaborepizzaria.menudino.com" target="_blank" rel="noopener noreferrer" className="bg-[#dc2626] text-white text-base font-semibold px-10 py-3.5 rounded-lg hover:bg-[#b91c1c] transition-colors mt-4" onClick={() => setMobileOpen(false)}>Peça Agora</a>
        </div>
      )}
    </nav>
  )
}
