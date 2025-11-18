import React, { useEffect, useMemo, useRef, useState } from 'react'
import { testimonials } from '../data/testimonials.js'

export default function Testimonials() {
  const items = useMemo(() => testimonials, [])
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  const count = items.length
  const next = () => setIndex(i => (i + 1) % count)
  const prev = () => setIndex(i => (i - 1 + count) % count)

  useEffect(() => {
    timer.current = setInterval(next, 5000)
    return () => clearInterval(timer.current)
  }, [count])

  const go = (i) => setIndex(i)

  return (
    <section id="testimonials" className="section alt">
      <div className="container">
        <h2>Testimonials</h2>
        <div className="carousel">
          <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {items.map((t) => (
              <div className="carousel__slide" key={t.name}>
                <blockquote className="quote card glass">
                  <p>“{t.quote}”</p>
                  <footer>— {t.name}, <span className="muted">{t.role}</span></footer>
                </blockquote>
              </div>
            ))}
          </div>
          <button className="carousel__btn prev" aria-label="Previous" onClick={prev}>‹</button>
          <button className="carousel__btn next" aria-label="Next" onClick={next}>›</button>
          <div className="carousel__dots" role="tablist" aria-label="Testimonials">
            {items.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? 'is-active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === index}
                role="tab"
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
