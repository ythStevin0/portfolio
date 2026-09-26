import { useState, useEffect } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navItems = ['About', 'Work', 'Skills', 'Contact']

  return (
    <nav className="grid-border-b" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      background: 'var(--bg)',
    }}>
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'space-between',
        alignItems: 'stretch'
      }}>
        {/* Left: Brand */}
        <div className="cell" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          borderRight: isMobile ? 'none' : '1px solid var(--grid-color)',
          borderBottom: 'none',
          padding: '1.5rem 2rem',
          flex: isMobile ? 1 : '0 0 25%'
        }}>
          <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.02em' }}>STEVINO</span>
        </div>

        {/* Middle Spacer (Desktop only) */}
        {!isMobile && (
          <div style={{ flex: 1 }} />
        )}

        {/* Right: Desktop Links OR Mobile Burger */}
        <div className="cell" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          gap: '2rem',
          borderLeft: isMobile ? 'none' : '1px solid var(--grid-color)',
          borderBottom: 'none',
          padding: '1.5rem 2rem',
          flex: isMobile ? '0 0 auto' : '0 0 25%'
        }}>
          {!isMobile ? (
            navItems.map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="link-underline t-micro"
                style={{ color: 'var(--muted)' }}
              >
                {item}
              </a>
            ))
          ) : (
            <button 
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--fg)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'none',
                letterSpacing: '0.1em'
              }}
            >
              {isOpen ? 'CLOSE' : 'MENU'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu (Animated) */}
      <div style={{
        display: isMobile ? 'grid' : 'none',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
        background: 'var(--bg)',
        width: '100%',
        borderTop: (isOpen && isMobile) ? '1px solid var(--grid-color)' : '1px solid transparent',
      }}>
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {navItems.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="t-micro"
              style={{ 
                color: 'var(--fg)', 
                padding: '1.5rem 2rem',
                borderBottom: i < navItems.length - 1 ? '1px solid var(--grid-color)' : 'none',
                textDecoration: 'none',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                transition: `opacity 0.4s ease ${0.1 + i * 0.05}s, transform 0.4s ease ${0.1 + i * 0.05}s`,
              }}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
