import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="muted">© {year} Tobi A.I Olaniyan. All rights reserved.</p>
        <div className="socials">
          <a href="https://github.com/Oluwatobi01" aria-label="GitHub" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#home" className="btn btn--sm">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
