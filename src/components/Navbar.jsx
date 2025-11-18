import React, { useEffect, useState } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__brand" href="#home">Tobi A.I Olaniyan</a>
      <div className="nav__right">
        <nav className={`nav__menu ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav__link">{l.label}</a>
          ))}
          {/* Desktop theme toggle inside menu */}
          <button className="btn btn--sm btn--theme" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
        </nav>
        {/* Mobile-only theme toggle to the right, before hamburger */}
        <button className="nav__theme" onClick={toggleTheme} aria-label="Toggle color theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="nav__toggle" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
