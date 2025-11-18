import React, { useEffect, useState } from 'react'

const WORDS = ['Developer', 'Designer', 'Engineer', 'Creator']

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="section hero">
      <div className="container hero__inner">
        <div className="badge">Open to opportunities</div>
        <h1 className="hero__title">
          Hi,I'm <span className="grad">Tobi A.I Olaniyan</span>
        </h1>
        <p className="hero__subtitle">A passionate <span className="flip">{WORDS[index]}</span></p>
        <p className="hero__desc">
          I build delightful, accessible web experiences with React, TypeScript and modern tooling.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#projects">View Projects</a>
          <a className="btn btn--ghost" href="#contact">Contact Me</a>
        </div>
      </div>
    </section>
  )
}
