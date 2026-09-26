import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const labelRef = useRef(null)
  const counterRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const counter = { val: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setIsAnimating(false)
        if (onComplete) onComplete()
      }
    })

    tl.to(counter, {
      val: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.floor(counter.val)).padStart(3, '0')
        }
      }
    })

    tl.to(labelRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'none'
    })

    tl.to(topRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut'
    }, 'split')

    tl.to(bottomRef.current, {
      yPercent: 100,
      duration: 0.8,
      ease: 'power3.inOut'
    }, 'split')

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [onComplete])

  if (!isAnimating) return null

  const halfStyle = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '50vh',
    background: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      pointerEvents: 'none',
    }}>
      <div ref={topRef} style={{ ...halfStyle, top: 0, borderBottom: '1px solid #333' }}>
        <div ref={labelRef} style={{ textAlign: 'center' }}>
          <div className="t-micro" style={{ marginBottom: '1rem', color: '#666' }}>PORTFOLIO — 2024</div>
          <div className="t-hero" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            STEVINO
          </div>
        </div>
      </div>

      <div ref={bottomRef} style={{ ...halfStyle, bottom: 0 }}>
        <div style={{ position: 'absolute', bottom: '2rem', right: '5%', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span className="t-micro">LOADING</span>
          <span ref={counterRef} style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 700, color: '#e8e8e8' }}>000</span>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: '1px',
        background: '#333',
        zIndex: 2
      }} />
    </div>
  )
}
