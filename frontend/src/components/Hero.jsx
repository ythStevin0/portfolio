import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Phase 1: Initial load animation
    const tlLoad = gsap.timeline({ delay: 2.2 })

    // Typewriter effect reveal
    tlLoad.fromTo('.hero-name-row .hero-char',
      { opacity: 0 },
      { opacity: 1, duration: 0.01, stagger: 0.06, ease: 'none' }
    )
    .fromTo('.hero-meta-item',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      '-=0.6'
    )
    .fromTo('.hero-scroll-cue',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )

    // Phase 2: Scroll-driven photo reveal + text split
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%', // Extended scroll distance for smoother feel
        scrub: 1, // Smoother scrubbing
        pin: true,
        anticipatePin: 1,
      }
    })

    // Photo: Vertical slit reveal
    tlScroll.fromTo('.hero-photo',
      { clipPath: 'inset(0 50% 0 50%)' },
      { clipPath: 'inset(0 0% 0 0%)', duration: 1, ease: 'power2.inOut' },
      0
    )

    // Photo: Subtle scale in
    tlScroll.fromTo('.hero-photo img',
      { scale: 1.4 },
      { scale: 1, duration: 1, ease: 'power2.out' },
      0
    )

    // Grid overlay fades in over the photo
    tlScroll.fromTo('.hero-grid-overlay',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'none' },
      0.3
    )

    // Typography moves up slightly while un-typing
    tlScroll.fromTo('.hero-typography-layer',
      { y: 0 },
      { y: -60, duration: 0.9, ease: 'power2.inOut' },
      0
    )
    
    // Name elements part slightly to frame the photo (Original Tuned Layout)
    tlScroll.to('.hero-word-stevino', { y: '-6vh', opacity: 0.2, duration: 1, ease: 'power2.inOut' }, 0)
    tlScroll.to('.hero-word-adi', { x: '5vw', opacity: 0.2, duration: 1, ease: 'power2.inOut' }, 0)
    tlScroll.to('.hero-word-nugroho', { x: '12vw', y: '28vh', opacity: 0.2, duration: 1, ease: 'power2.inOut' }, 0) 

    // Meta items slide out
    tlScroll.to('.hero-meta-left', { x: -60, opacity: 0, duration: 0.5, ease: 'none' }, 0)
    tlScroll.to('.hero-meta-right', { x: 60, opacity: 0, duration: 0.5, ease: 'none' }, 0)

  }, { scope: containerRef })

  const charWrap = (text) => text.split('').map((ch, i) => (
    <span key={i} className="hero-char" style={{
      display: 'inline-block',
      willChange: 'transform',
    }}>{ch}</span>
  ))

  return (
    <section ref={containerRef} id="hero" className="section" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Navbar spacer */}
      <div style={{ height: '60px', flexShrink: 0 }} />

      {/* Full-bleed center area */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* === PROFILE PHOTO === */}
        <div className="hero-photo" style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          clipPath: 'inset(0 50% 0 50%)',
          willChange: 'clip-path',
        }}>
          <img
            src="/assets/profile.jpg"
            alt="Stevino Adi Nugroho"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              filter: 'grayscale(1) contrast(1.2) brightness(0.8)',
              willChange: 'transform',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(10,10,10,0.8) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* === GRID OVERLAY === */}
        <div className="hero-grid-overlay" style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          pointerEvents: 'none',
        }}>
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} style={{
              border: '0.5px solid rgba(255,255,255,0.08)',
            }} />
          ))}
        </div>

        {/* === TYPOGRAPHY LAYER === */}
        <div className="hero-typography-layer" style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          color: '#fff',
          pointerEvents: 'none',
          width: '100%',
          padding: '0 2rem',
          gap: '1vh',
        }}>
          
          {/* Row 1: STEVINO */}
          <div className="hero-name-row hero-row-1" style={{
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}>
            <span className="hero-word-stevino" style={{ display: 'inline-block', willChange: 'transform, opacity' }}>
              {charWrap('STEVINO')}
            </span>
          </div>


          {/* Row 2: ADI NUGROHO */}
          <div className="hero-name-row hero-row-2" style={{
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}>
            <span className="hero-word-adi" style={{ display: 'inline-block', willChange: 'transform, opacity', marginRight: '3vw' }}>
              {charWrap('ADI')}
            </span>
            <span className="hero-word-nugroho" style={{ display: 'inline-block', willChange: 'transform, opacity' }}>
              {charWrap('NUGROHO')}
            </span>
          </div>

        </div>

        {/* === METADATA corners === */}
        <div className="hero-meta-left hero-meta-item" style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}>
          <span className="t-micro">Frontend & 3D Web</span>
          <span className="t-micro">React — Three.js — GSAP</span>
        </div>

        <div className="hero-meta-right hero-meta-item" style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          zIndex: 4,
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}>
          <span className="t-micro">Based in Indonesia</span>
          <span className="t-micro">Portfolio 2024</span>
        </div>

        <div className="hero-meta-item" style={{
          position: 'absolute',
          top: '1.5rem',
          left: '2rem',
          zIndex: 4,
        }}>
          <span className="t-micro" style={{ color: 'var(--muted)' }}>47.3°N / 8.5°E</span>
        </div>

        <div className="hero-meta-item" style={{
          position: 'absolute',
          top: '1.5rem',
          right: '2rem',
          zIndex: 4,
        }}>
          <span className="t-micro" style={{ color: 'var(--muted)' }}>001 / 005</span>
        </div>
      </div>

      {/* === BOTTOM BAR === */}
      <div className="grid-row grid-border-t hero-scroll-cue" style={{ flexShrink: 0 }}>
        <div className="cell grid-border-r" style={{ gridColumn: 'span 4', padding: '1rem 2rem' }}>
          <span className="t-micro hero-meta-item">Open for opportunities</span>
        </div>
        <div className="cell grid-border-r" style={{ gridColumn: 'span 4', padding: '1rem 2rem', textAlign: 'center' }}>
          <span className="t-micro hero-meta-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              display: 'inline-block',
              width: '1px',
              height: '20px',
              background: 'var(--muted)',
              animation: 'scrollPulse 1.5s ease-in-out infinite',
            }} />
            Scroll
          </span>
        </div>
        <div className="cell" style={{ gridColumn: 'span 4', padding: '1rem 2rem', textAlign: 'right' }}>
          <span className="t-micro hero-meta-item">©2024</span>
        </div>
      </div>
    </section>
  )
}
