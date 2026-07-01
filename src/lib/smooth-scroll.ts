import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(33, 16)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

export function getLenis() {
  return lenisInstance
}
