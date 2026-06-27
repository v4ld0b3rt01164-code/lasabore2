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
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
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
