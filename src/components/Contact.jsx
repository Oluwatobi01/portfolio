import React, { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  // Netlify Forms + fetch submission (no server required)
  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const formData = new FormData(form)

    // Netlify requires a form-name field
    formData.append('form-name', 'contact')

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams([...formData]).toString(),
      })
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2>Contact</h2>
        <p>Have a question or want to work together? Feel free to reach out.</p>
        <form
          className="form"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* Required hidden input for Netlify forms */}
          <input type="hidden" name="form-name" value="contact" />
          {/* Honeypot field */}
          <input type="hidden" name="bot-field" />
          {/* This will be used for email notifications (Netlify dashboard) */}
          <input type="hidden" name="to" value="isaacabraham028@gmail.com" />

          <div className="grid-2">
            <label>
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" placeholder="Your message" required />
          </label>
          <div className="form__actions">
            <button className="btn btn--primary" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
            <a className="btn btn--ghost" href="mailto:isaacabraham028@gmail.com">Email me</a>
          </div>
          {status === 'success' && <p className="small muted" role="status">Thanks! Your message was sent.</p>}
          {status === 'error' && <p className="small" role="alert">Something went wrong. Please try again.</p>}
        </form>
        <p className="small muted">Note: Messages are handled by Netlify Forms. Ensure email notifications are enabled for the "contact" form in the Netlify dashboard.</p>
      </div>
    </section>
  )
}
