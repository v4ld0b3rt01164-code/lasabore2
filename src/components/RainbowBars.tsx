import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  className?: string
  /** 'straight' = vertical bars | 'curve' = L-shape (vertical then horizontal), like clone rainbow-sides */
  variant?: 'straight' | 'curve'
  /** bar colors, left to right */
  colors?: string[]
  /** stroke width of fills */
  strokeWidth?: number
  /** show dark outline around each bar (default false — no rectangle frame) */
  outline?: boolean
  /** draw direction */
  direction?: 'down' | 'up'
  /** viewport-based scrub; false = play once on enter */
  scrub?: boolean
  stagger?: number
  duration?: number
}

export default function RainbowBars({
  className = '',
  variant = 'straight',
  colors = ['#009246', '#FFFFFF', '#DC2626'],
  strokeWidth = 48,
  outline = false,
  direction = 'down',
  scrub = true,
  stagger = 0.0375,
  duration = 0.5,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const paths = root.querySelectorAll<SVGPathElement>('[data-bar-fill]')

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const totalLen = path.getTotalLength()
        path.style.strokeDasharray = `${totalLen}`
        path.style.strokeDashoffset = `${totalLen}`
      })

      const tl = gsap.timeline({
        scrollTrigger: scrub
          ? {
              trigger: root,
              start: 'clamp(top bottom)',
              end: 'bottom top',
              scrub: 0.4,
            }
          : {
              trigger: root,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
      })

      tl.fromTo(
        paths,
        { strokeDashoffset: direction === 'down' ? (i: number) => paths[i].getTotalLength() : 0 },
        {
          strokeDashoffset: direction === 'down' ? 0 : (i: number) => paths[i].getTotalLength(),
          duration,
          ease: 'power1.out',
          stagger,
        },
      )
    }, rootRef)

    return () => ctx.revert()
  }, [variant, colors, strokeWidth, outline, direction, scrub, stagger, duration])

  // Build paths
  const count = colors.length
  const stepX = 50

  const bars = Array.from({ length: count }, (_, i) => {
    const x = 26 + i * stepX
    let d: string
    if (variant === 'curve') {
      // L-curve like clone rainbow-sides: vertical then curve to right
      const cp1y = 510.457 - i * 27.614
      const cp2x = 115.543 + i * 27.614
      const endY = 600 - i * 50
      d = `M${x} 0V400C${x} ${cp1y} ${cp2x} ${endY} 226 ${endY}H321`
    } else {
      d = `M${x} 0V600`
    }
    return { x, d, color: colors[i] }
  })

  const viewBoxW = variant === 'curve' ? 321 : 26 + (count - 1) * stepX + 26
  const viewBoxH = variant === 'curve' ? 626 : 600

  return (
    <div ref={rootRef} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        fill="none"
        preserveAspectRatio="none"
        className="block w-full h-full"
      >
        {outline && bars.map((b, i) => (
          <path key={`o-${i}`} d={b.d} stroke="#121212" strokeWidth={strokeWidth + 4} />
        ))}
        {bars.map((b, i) => (
          <path
            key={`f-${i}`}
            data-bar-fill
            d={b.d}
            stroke={b.color}
            strokeWidth={strokeWidth}
          />
        ))}
      </svg>
    </div>
  )
}
