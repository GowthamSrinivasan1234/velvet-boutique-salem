import { useState } from 'react'
import useInView from '../hooks/useInView'
import './Contact.css'

function AnimSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-fade-up' : ''}`}
      style={{ opacity: inView ? undefined : 0, animationDelay: `${delay}s` }}>{children}</div>
  )
}

const contactInfo = [
  { icon: '📍', label: 'Visit Us', value: 'Indira Gandhi Rd, Fairlands\nSalem, Tamil Nadu 636016' },
  { icon: '📧', label: 'Email Us', value: 'velvetboutique2k24@gmail.com' },
  { icon: '📞', label: 'Call Us', value: '+91 93451 88551' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 10am – 8pm\nSun: Closed' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // CallMeBot Configuration - Get your API key at https://www.callmebot.com/blog/free-api-whatsapp-messages/
  const CALLMEBOT_PHONE = '919345188551' // Your WhatsApp number (without +)
  const CALLMEBOT_APIKEY = 'YOUR_CALLMEBOT_API_KEY' // Replace with your CallMeBot API key

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create WhatsApp notification message
      const whatsappMsg = `🛍️ *New Contact Form Submission*\n\n👤 *Name:* ${form.name}\n📧 *Email:* ${form.email}\n📞 *Phone:* ${form.phone}\n📋 *Subject:* ${form.subject}\n💬 *Message:* ${form.message || 'Not provided'}`
      
      // Send WhatsApp notification via CallMeBot (fire-and-forget)
      if (CALLMEBOT_APIKEY !== 'YOUR_CALLMEBOT_API_KEY') {
        fetch(`https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${encodeURIComponent(whatsappMsg)}&apikey=${CALLMEBOT_APIKEY}`, {
          mode: 'no-cors'
        }).catch(() => {}) // Silent fail - notification is best-effort
      }

      // Show success immediately (don't wait for CallMeBot response due to CORS)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="contact-hero">
        <div className="container">
          <AnimSection>
            <span className="hero__badge">Get in Touch</span>
            <h1 className="contact-hero__title">
              We'd Love to <span className="contact-hero__accent">Hear From You</span>
            </h1>
            <p className="contact-hero__desc">
              Have a question, suggestion, or just want to say hello? We're always here.
            </p>
          </AnimSection>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-layout">
          {/* ── Info Cards ── */}
          <div className="contact-info-grid">
            {contactInfo.map((c, i) => (
              <AnimSection key={c.label} delay={i * 0.1}>
                <div className="contact-info-card">
                  <span className="contact-info-card__icon">{c.icon}</span>
                  <h3>{c.label}</h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{c.value}</p>
                </div>
              </AnimSection>
            ))}
          </div>

          {/* ── Form ── */}
          <AnimSection delay={0.2}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send a Message</h2>

              {submitted && (
                <div className="form-success animate-scale-in">
                  ✅ Thank you for reaching out! Our team will get back to you shortly.
                </div>
              )}

              {error && (
                <div className="form-error animate-scale-in">
                  ❌ {error}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input id="name" type="text" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" required value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" type="text" required value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message <span className="optional">(Optional)</span></label>
                <textarea id="message" rows={5} value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." />
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message ✦'}
              </button>
            </form>
          </AnimSection>
        </div>
      </section>

      {/* ═══ GOOGLE MAP ═══ */}
      <section className="contact-map">
        <iframe
          className="contact-map__iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924!2d78.1437772!3d11.6761752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf100730a1599%3A0x28c14b12d5a3a568!2sVelvet%20Boutique!5e1!3m2!1sen!2sin!4v1709500000000"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Velvet Boutique Location"
        />
      </section>
    </>
  )
}
