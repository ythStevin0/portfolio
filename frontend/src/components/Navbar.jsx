export function Navbar() {
  return (
    <nav className="grid-border-b" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      background: 'var(--bg)',
    }}>
      <div className="grid-row">
        <div className="cell grid-border-r" style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.02em' }}>STEVINO</span>
        </div>

        <div className="cell" style={{ gridColumn: 'span 6' }} />

        <div className="cell grid-border-l" style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2rem' }}>
          {['About', 'Work', 'Skills', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="link-underline t-micro"
              style={{ color: 'var(--muted)' }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
