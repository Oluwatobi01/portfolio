import React from 'react'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid-2">
        <div>
          <h2>About Me</h2>
          <p>
            I'm a software engineer focused on crafting scalable front-end systems with a strong emphasis on user experience,
            performance, and maintainability. I enjoy bridging the gap between design and engineering to ship polished products.
          </p>
          <ul className="tags">
            <li>React</li>
            <li>TypeScript</li>
            <li>Node.js</li>
            <li>Vite</li>
            <li>Tailwind</li>
            <li>Testing</li>
          </ul>
        </div>
        <figure className="card glass about__image">
          <img
            src="https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmasdrive.netlify.app?w=1200"
            alt="Masdrive – Netlify-deployed project screenshot"
            onError={(e) => { e.currentTarget.src = '/images/portfolio-screenshot.svg' }}
          />
          <figcaption className="muted small">Masdrive (Netlify) — live UI preview</figcaption>
        </figure>
      </div>
    </section>
  )
}
