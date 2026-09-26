import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Section label clip-path reveal
    gsap.fromTo('.about-label',
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', x: -50 },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        x: 0, duration: 1.2, ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )

    // Each heading word slides up with stagger
    gsap.fromTo('.about-word',
      { yPercent: 120 },
      {
        yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.08,
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 85%',
        }
      }
    )

    // Body text paragraphs reveal
    gsap.fromTo('.about-body-p',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-body',
          start: 'top 85%',
        }
      }
    )

    // Stats count up and pop
    gsap.fromTo('.about-stat',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 90%',
        }
      }
    )

    // Marquee text: continuous scroll-driven movement
    gsap.to('.about-marquee-inner', {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-marquee',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      }
    })

    // Horizontal rule grows from left
    gsap.fromTo('.about-rule',
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1, duration: 1.5, ease: 'power4.inOut',
        scrollTrigger: {
          trigger: '.about-rule',
          start: 'top 90%',
        }
      }
    )

  }, { scope: containerRef })

  const marqueeWords = ['FUNDAMENTAL', 'REST API', 'STRUKTUR', 'OTOMASI', 'WEB3', 'DATABASE', 'NODE.JS', 'AI']

  return (
    <section id="about" className="section" ref={containerRef}>
      {/* Section label row */}
      <div className="grid-row grid-border-b">
        <div className="cell" style={{ gridColumn: 'span 12' }}>
          <span className="t-section about-label" style={{ display: 'inline-block', willChange: 'transform, clip-path' }}>
            001 — Tentang
          </span>
        </div>
      </div>

      {/* Big heading row */}
      <div className="grid-row grid-border-b">
        <div className="cell about-heading" style={{
          gridColumn: 'span 12',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
          }}>
            {['Full-Stack', 'Developer,', 'merancang', 'arsitektur', 'sistem', 'di', 'persimpangan', 'antara', 'logika', '&', 'karya', 'visual.'].map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em', verticalAlign: 'top' }}>
                <span className="about-word" style={{
                  display: 'inline-block',
                  willChange: 'transform',
                  color: ['Full-Stack', 'Developer,', '&', 'logika', 'visual.'].includes(word) ? 'var(--fg)' : 'var(--muted)',
                }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="about-marquee grid-border-b" style={{
        overflow: 'hidden',
        padding: '0.8rem 0',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="about-marquee-inner" style={{
          display: 'flex',
          gap: '0',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          animation: 'aboutMarquee 15s linear infinite',
        }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ display: 'flex', flexShrink: 0 }}>
              {marqueeWords.map((word, wIdx) => {
                const isHighlight = word === 'OTOMASI' || word === 'WEB3';
                return (
                  <span key={wIdx} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    color: isHighlight ? '#fff' : 'var(--muted)',
                    fontWeight: isHighlight ? 'bold' : 'normal',
                    textShadow: isHighlight ? '0 0 8px rgba(255,255,255,0.6)' : 'none',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}>
                    {word}
                    <span style={{ 
                      color: 'var(--border)', 
                      padding: '0 2rem', 
                      textShadow: 'none', 
                      fontWeight: 'normal',
                      fontSize: '1rem'
                    }}>·</span>
                  </span>
                )
              })}
            </span>
          ))}
        </div>
      </div>

      {/* Content row: Bio + Stats */}
      <div className="grid-row grid-border-b">
        {/* Left column: Bio */}
        <div className="cell grid-border-r about-body" style={{
          gridColumn: 'span 7',
          paddingTop: '3rem',
          paddingBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <p className="t-body about-body-p" style={{
            maxWidth: '560px',
            lineHeight: 1.8,
            willChange: 'opacity, transform',
          }}>
            Saya adalah seorang Full-Stack Developer yang memadukan <strong>logika backend tingkat lanjut</strong> dengan <strong>keindahan karya visual</strong> di sisi frontend. Pendekatan saya bukan sekadar merakit antarmuka, melainkan merancang arsitektur aplikasi yang kokoh secara menyeluruh—mulai dari optimalisasi struktur database, perancangan REST API, hingga implementasi keamanan infrastruktur.
          </p>
          <p className="t-body about-body-p" style={{
            maxWidth: '560px',
            lineHeight: 1.8,
            willChange: 'opacity, transform',
          }}>
            Lebih dari sekadar pemrograman konvensional, saya sangat tertarik pada penciptaan ekosistem cerdas. Saat ini saya mengintegrasikan alur kerja otomatisasi (*Automation*) menggunakan <strong>n8n</strong> dan mengeksplorasi potensi desentralisasi <strong>Web3</strong>.
          </p>

          {/* Horizontal rule animated */}
          <div className="about-rule" style={{
            width: '100%',
            maxWidth: '560px',
            height: '1px',
            background: 'var(--border)',
            marginTop: '1rem',
            willChange: 'transform',
          }} />

          <p className="t-body about-body-p" style={{
            maxWidth: '560px',
            lineHeight: 1.8,
            color: '#e0e0e0',
            fontSize: '0.95rem',
            willChange: 'opacity, transform',
          }}>
            Saya memastikan setiap produk digital yang saya bangun tidak hanya memanjakan mata, tapi juga <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 8px rgba(255,255,255,0.6)' }}>Efisien</span>, otomatis, dan siap untuk <span style={{ color: '#fff', fontWeight: 'bold', textShadow: '0 0 8px rgba(255,255,255,0.6)' }}>Masa Depan</span>.
          </p>
        </div>

        {/* Right column: Stats */}
        <div className="cell about-stats" style={{
          gridColumn: 'span 5',
          paddingTop: '3rem',
          paddingBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0',
        }}>
          {[
            { label: 'Repositori GitHub', value: '30+', unit: '' },
            { label: 'Proyek Utama', value: '10+', unit: '' },
            { label: 'Klien', value: '6+', unit: '' },
          ].map((stat, i) => (
            <div
              key={i}
              className="about-stat"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                padding: '1.5rem 0',
                borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                willChange: 'opacity, transform',
              }}
            >
              <span className="t-mono" style={{
                color: 'var(--muted)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}>
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="t-mono" style={{
                    color: 'var(--muted)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                  }}>
                    {stat.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
