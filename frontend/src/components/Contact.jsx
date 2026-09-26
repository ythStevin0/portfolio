import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const containerRef = useRef(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [result, setResult] = useState("Send Message")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setResult("Sending...")
    
    const data = new FormData(e.target)
    
    // GANTI INI DENGAN ACCESS KEY WEB3FORMS ANDA NANTI:
    data.append("access_key", "YOUR_ACCESS_KEY_HERE")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      })
      const dataRes = await response.json()
      
      if (dataRes.success) {
        setResult("Sent Successfully!")
        e.target.reset()
        setFormData({ name: '', email: '', message: '' })
      } else {
        console.log("Error", dataRes)
        setResult(dataRes.message)
      }
    } catch (error) {
      console.log(error)
      setResult("Error! Try again.")
    }
    
    // Reset button text after 5 seconds
    setTimeout(() => {
      setResult("Send Message")
    }, 5000)
  }

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

    // Heading slice up
    gsap.fromTo('.anim-contact-left',
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out',
        scrollTrigger: {
          trigger: '.anim-contact-left',
          start: 'top 75%',
        }
      }
    )

    // Input fields slide in aggressively from the right
    gsap.fromTo('.anim-contact-input',
      { x: 100, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: {
          trigger: '.anim-contact-input',
          start: 'top 80%',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="contact" className="section" ref={containerRef}>
      {/* Section label */}
      <div className="grid-row grid-border-b">
        <div className="cell" style={{ gridColumn: 'span 12' }}>
          <span className="t-section anim-section-label" style={{ display: 'inline-block', willChange: 'transform, clip-path' }}>004 — Contact</span>
        </div>
      </div>

      <div className="grid-row grid-border-b">
        {/* Left: heading */}
        <div className="cell grid-border-r" style={{ gridColumn: 'span 5', paddingTop: '4rem', paddingBottom: '4rem', overflow: 'hidden' }}>
          <div className="anim-contact-left" style={{ willChange: 'opacity, transform' }}>
            <h2 className="t-heading" style={{ marginBottom: '2rem' }}>
              Let's work<br />together.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="t-mono" style={{ width: 'fit-content', cursor: 'default' }}>404stevino@gmail.com</span>
              <span className="t-micro" style={{ marginTop: '1rem' }}>Gresik, Jawa Timur, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="cell" style={{ gridColumn: 'span 7', paddingTop: '4rem', paddingBottom: '4rem', overflow: 'hidden' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="anim-contact-input" style={{ willChange: 'opacity, transform' }}>
              <label className="t-micro" htmlFor="name" style={{ display: 'block', marginBottom: '0.75rem' }}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--grid-color)',
                  color: 'var(--fg)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  padding: '0.75rem 0',
                  outline: 'none',
                  borderRadius: 0,
                }}
              />
            </div>

            <div className="anim-contact-input" style={{ willChange: 'opacity, transform' }}>
              <label className="t-micro" htmlFor="email" style={{ display: 'block', marginBottom: '0.75rem' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--grid-color)',
                  color: 'var(--fg)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  padding: '0.75rem 0',
                  outline: 'none',
                  borderRadius: 0,
                }}
              />
            </div>

            <div className="anim-contact-input" style={{ willChange: 'opacity, transform' }}>
              <label className="t-micro" htmlFor="message" style={{ display: 'block', marginBottom: '0.75rem' }}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--grid-color)',
                  color: 'var(--fg)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  padding: '0.75rem 0',
                  outline: 'none',
                  resize: 'none',
                  borderRadius: 0,
                }}
              />
            </div>

            <button
              type="submit"
              className="anim-contact-input"
              style={{
                alignSelf: 'flex-start',
                background: 'var(--fg)',
                color: 'var(--bg)',
                border: 'none',
                padding: '1rem 3rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'none',
                borderRadius: 0,
                transition: 'opacity 0.2s ease',
                willChange: 'opacity, transform'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              disabled={result === "Sending..."}
            >
              {result}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

