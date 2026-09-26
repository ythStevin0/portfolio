export function Footer() {
  return (
    <footer className="grid-border-t">
      <div className="grid-row">
        <div className="cell grid-border-r" style={{ gridColumn: 'span 4' }}>
          <span style={{ fontWeight: 900, fontSize: '1rem' }}>STEVINO</span>
        </div>
        <div className="cell grid-border-r" style={{ gridColumn: 'span 4', display: 'flex', gap: '2rem' }}>
          <a href="https://github.com/ythstevino" target="_blank" rel="noopener noreferrer" className="link-underline t-micro" style={{ color: 'var(--muted)' }}>Github</a>
          <a href="https://www.threads.net/@ythstevino" target="_blank" rel="noopener noreferrer" className="link-underline t-micro" style={{ color: 'var(--muted)' }}>Threads</a>
          <a href="https://www.instagram.com/ythstevino/" target="_blank" rel="noopener noreferrer" className="link-underline t-micro" style={{ color: 'var(--muted)' }}>Instagram</a>
        </div>
        <div className="cell" style={{ gridColumn: 'span 4', textAlign: 'right' }}>
          <span className="t-micro">&copy; {new Date().getFullYear()} All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}
