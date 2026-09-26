import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Skills() {
  const containerRef = useRef(null)

  const groups = [
    { label: 'Frontend & Web3', items: ['React & Next.js', 'Vue.js & React Native', 'TypeScript (Strict)', 'Tailwind & PostCSS', 'WebAssembly (Rust)', 'Web3.js & Solidity'] },
    { label: '3D, Motion & AI', items: ['Three.js & R3F', 'WebGL / GLSL Shaders', 'Phaser.js (Web Gaming)', 'GSAP & Framer Motion', 'TensorFlow.js (AI)', 'LLM Agents & RAG'] },
    { label: 'Backend, Cloud & Auto', items: ['Node.js & Python', 'Supabase & PostgreSQL', 'REST APIs & GraphQL', 'Cloudflare Edge & WAF', 'Docker & Kubernetes', 'n8n & Zapier Automation'] },
  ]

  useGSAP(() => {
    // Label slide-in
    gsap.fromTo('.anim-section-label', 
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

    // Staggered column drop
    gsap.fromTo('.anim-skill-col',
      { y: -100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.15,
        scrollTrigger: {
          trigger: '.anim-skill-col',
          start: 'top 75%',
        }
      }
    )

    // Staggered list items inside the columns
    gsap.fromTo('.anim-skill-item',
      { x: -20, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05,
        scrollTrigger: {
          trigger: '.anim-skill-col',
          start: 'top 70%',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="skills" className="section" ref={containerRef}>
      {/* Section label */}
      <div className="grid-row grid-border-b">
        <div className="cell" style={{ gridColumn: 'span 12' }}>
          <span className="t-section anim-section-label" style={{ display: 'inline-block', willChange: 'transform, clip-path' }}>003 — Technical Index</span>
        </div>
      </div>

      {/* Skill groups side by side */}
      <div className="grid-row grid-border-b">
        {groups.map((group, i) => (
          <div
            key={group.label}
            className={`cell anim-skill-col ${i < groups.length - 1 ? 'grid-border-r' : ''}`}
            style={{ gridColumn: 'span 4', paddingTop: '3rem', paddingBottom: '3rem', willChange: 'opacity, transform' }}
          >
            <div className="t-micro" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--grid-color)' }}>
              {group.label}
            </div>
            <ul style={{ listStyle: 'none' }}>
              {group.items.map((item, j) => (
                <li
                  key={item}
                  className="anim-skill-item"
                  style={{
                    padding: '0.75rem 0',
                    borderBottom: j < group.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    willChange: 'opacity, transform'
                  }}
                >
                  <span className="t-mono" style={{ color: 'var(--muted)', marginRight: '1rem', fontSize: '0.7rem' }}>
                    {String(j + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
