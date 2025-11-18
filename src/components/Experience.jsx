import React from 'react'
import { experience } from '../data/experience.js'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2>Experience</h2>
        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.company} className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__content">
                <h3>{e.role} · <span className="muted">{e.company}</span></h3>
                <p className="muted small">{e.period}</p>
                <ul className="list small">
                  {e.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
