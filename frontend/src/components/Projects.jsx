import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  const projects = [
    {
      id: '01',
      title: 'Game_Web',
      category: 'Web Game',
      year: 'Aug 2026',
      description: 'Website interaktif dengan keunggulan pada transisi tiap section yang imersif—menyajikan alur cerita, karakter, serta penerapan demo game interaktif yang dapat dimainkan langsung di browser.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      image: '/assets/project-game-web.png',
      link: 'https://github.com/ythStevin0/Game_Web'
    },
    {
      id: '02',
      title: 'Prime_UB',
      category: 'Event Platform',
      year: 'Aug 2026',
      description: 'Platform informasi event kompetisi berskala besar. Dioptimalkan dengan komponen React yang modular, routing efisien, dan arsitektur rendering super cepat.',
      stack: ['React', 'Tailwind CSS', 'Vite'],
      image: '/assets/project-prime-ub.png',
      link: 'https://github.com/ythStevin0/Prime_UB_2027'
    },
    {
      id: '03',
      title: 'hl-finance',
      category: 'Financial Dashboard',
      year: 'May 2026',
      description: 'Sistem Point of Sale & Dashboard Finansial yang kompleks. Mengintegrasikan manajemen state dinamis dan sistem arsitektur REST API yang terstruktur pada backend.',
      stack: ['React', 'Node.js', 'Tailwind'],
      image: '/assets/project-hl-finance.png',
      link: 'https://github.com/ythStevin0/hl-finance'
    },
    {
      id: '04',
      title: 'DesignLens',
      category: 'UI/UX Platform',
      year: 'Jul 2026',
      description: 'Platform feedback desain yang menggabungkan interaksi komunitas dan analisis heuristik AI. Dibangun dengan sistem asinkronus (Node.js) untuk pemrosesan data real-time.',
      stack: ['React', 'AI Integration', 'Node.js'],
      image: '/assets/project-designlens.png',
      link: 'https://github.com/ythStevin0/DesignLens'
    },
    {
      id: '05',
      title: 'Cineread',
      category: 'Media Catalog',
      year: 'Mar 2026',
      description: 'Aplikasi Full-Stack dengan arsitektur database yang matang. Memiliki mesin rekomendasi cerdas (Python) yang menganalisis pola data melalui RESTful API berkinerja tinggi.',
      stack: ['React', 'Node.js', 'Python', 'AI'],
      image: '/assets/project-cineread.png',
      link: 'https://github.com/ythStevin0/cineread'
    },
  ]

  useGSAP(() => {
    // Section label
    gsap.fromTo('.projects-label',
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

    // Horizontal scroll
    const track = trackRef.current
    const cards = track.querySelectorAll('.pcard')
    const totalWidth = track.scrollWidth - window.innerWidth

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    // Each card entrance
    cards.forEach((card) => {
      gsap.fromTo(card.querySelector('.pcard-img'),
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById?.('hscroll'),
            start: 'left right',
            end: 'left left',
            scrub: true,
          }
        }
      )
    })

  }, { scope: containerRef })

  return (
    <section id="work" className="section" ref={containerRef} style={{ overflow: 'hidden' }}>
      {/* Section label */}
      <div className="grid-row grid-border-b">
        <div className="cell" style={{ gridColumn: 'span 8' }}>
          <span className="t-section projects-label" style={{ display: 'inline-block', willChange: 'transform, clip-path' }}>
            002 — Selected Work
          </span>
        </div>
        <div className="cell" style={{
          gridColumn: 'span 4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '2rem',
          gap: '1rem',
        }}>
          <span className="t-mono" style={{ color: 'var(--muted)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            SCROLL →
          </span>
          <span className="t-mono" style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>
            {String(projects.length).padStart(2, '0')} Projects
          </span>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '0',
          height: 'calc(100vh - 60px - 3.5rem)',
          willChange: 'transform',
        }}
      >
        {projects.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="pcard"
            style={{
              flex: '0 0 75vw',
              height: '100%',
              display: 'grid',
              gridTemplateRows: '1fr auto',
              borderRight: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('.pcard-img')
              if (img) img.style.filter = 'grayscale(0) contrast(1.05)'
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('.pcard-img')
              if (img) img.style.filter = 'grayscale(0.5) contrast(1.1)'
            }}
          >
            {/* Image area */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              borderBottom: '1px solid var(--border)',
            }}>
              <img
                className="pcard-img"
                src={p.image}
                alt={p.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: p.objectFit || 'cover',
                  objectPosition: p.objectPosition || 'center',
                  display: 'block',
                  filter: 'grayscale(0.5) contrast(1.1)',
                  transition: 'filter 0.6s ease',
                  willChange: 'transform',
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.3) 50%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              {/* Floating number */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                fontWeight: 900,
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: 'rgba(255,255,255,0.06)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                pointerEvents: 'none',
              }}>
                {p.id}
              </div>
              {/* Content overlaid on bottom of image */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}>
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}>
                    {p.title}
                  </h3>
                </a>
                <p style={{
                  fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.6)',
                  maxWidth: '500px',
                }}>
                  {p.description}
                </p>
              </div>
            </div>

            {/* Bottom info bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 2rem',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              {/* Left: Category + Year */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span className="t-mono" style={{
                  color: 'var(--muted)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  {p.category}
                </span>
                <span className="t-mono" style={{ color: 'var(--border)', fontSize: '0.65rem' }}>
                  /
                </span>
                <span className="t-mono" style={{
                  color: 'var(--muted)',
                  fontSize: '0.65rem',
                }}>
                  {p.year}
                </span>
              </div>

              {/* Right: Tech tags */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: '0.25rem 0.6rem',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.06em',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      transition: 'border-color 0.3s ease, color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--fg)'
                      e.currentTarget.style.color = 'var(--fg)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--muted)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* End card: CTA */}
        <div style={{
          flex: '0 0 40vw',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          padding: '4rem',
        }}>
          <span className="t-mono" style={{
            color: 'var(--muted)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            More Coming Soon
          </span>
          <div style={{
            width: '40px',
            height: '1px',
            background: 'var(--border)',
          }} />
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'gap 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.gap = '1.2rem'}
            onMouseLeave={(e) => e.currentTarget.style.gap = '0.75rem'}
          >
            Get in Touch
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
