import { useSmoothScroll } from './lib/smooth-scroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Destaques from './components/Destaques'
import Cardapio from './components/Cardapio'
import Entrega from './components/Entrega'
import Sobre from './components/Sobre'
import Localizacao from './components/Localizacao'
import CtaFinal from './components/CtaFinal'
import Footer from './components/Footer'

export default function App() {
  useSmoothScroll()

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#d4ed31] text-[#121212]">
      <Navbar />
      <main>
        <Hero />
        <Destaques />
        <Cardapio />
        <CtaFinal />
        <Entrega />
        <Sobre />
        <Localizacao />
      </main>
      <Footer />
    </div>
  )
}
