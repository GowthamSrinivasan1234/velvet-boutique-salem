import useInView from '../hooks/useInView'
import './About.css'

function AnimSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`${className} ${inView ? 'animate-fade-up' : ''}`}
      style={{ opacity: inView ? undefined : 0, animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

const values = [
  { icon: '🌿', title: 'Sustainable', desc: 'We partner with eco-conscious brands and use sustainable packaging for every order.' },
  { icon: '✂️', title: 'Quality Crafted', desc: 'Every piece is inspected to ensure it meets our high standards of quality and design.' },
  { icon: '🌍', title: 'Globally Sourced', desc: 'We curate fashion from artisans and designers around the world.' },
  { icon: '💜', title: 'Inclusive', desc: 'Fashion for every body, every style, and every occasion — no exceptions.' },
]

const timeline = [
  { year: '2018', title: 'The Dream Begins', desc: 'Founded in a cozy studio in Salem, Tamil Nadu with a passion for unique fashion.' },
  { year: '2019', title: 'First Pop-Up', desc: 'Hosted our first pop-up shop in Fairlands — sold out in 3 hours!' },
  { year: '2021', title: 'Going Online', desc: 'Launched our Instagram presence, reaching customers across India.' },
  { year: '2023', title: '10,000 Customers', desc: 'Reached a milestone of 10k happy customers and counting.' },
  { year: '2025', title: 'Flagship Store', desc: 'Opened our flagship store on Indira Gandhi Rd, Fairlands, Salem.' },
]

const team = [
  { name: 'Devika S', role: 'Founder & Creative Director', emoji: '👩‍🎨' },
  { name: 'Lalith S', role: 'Head of Operations', emoji: '👨‍💼' },
  { name: 'Kamaran', role: 'Lead Stylist', emoji: '✂️' },
  { name: 'Nandhini R', role: 'Brand Manager', emoji: '👩‍💻' },
]

export default function About() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <AnimSection>
            <span className="hero__badge">Our Story</span>
            <h1 className="about-hero__title">
              Fashion with <span className="about-hero__accent">Heart & Soul</span>
            </h1>
            <p className="about-hero__desc">
              Born from a love of bold self-expression, Velvet Boutique is a proud
              women-owned boutique in Salem, Tamil Nadu. We believe fashion should
              empower, inspire, and make you feel extraordinary.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="section about-values">
        <div className="container">
          <AnimSection><h2 className="section-title">What We Stand For</h2></AnimSection>
          <AnimSection delay={0.1}><p className="section-subtitle">Our core values drive every decision, every collection, every stitch</p></AnimSection>
          <div className="values-grid">
            {values.map((v, i) => (
              <AnimSection key={v.title} delay={i * 0.1}>
                <div className="value-card">
                  <span className="value-card__icon">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="section about-timeline">
        <div className="container">
          <AnimSection><h2 className="section-title">Our Journey</h2></AnimSection>
          <AnimSection delay={0.1}><p className="section-subtitle">From a cozy Salem studio to Indira Gandhi Road — here's how we got here</p></AnimSection>
          <div className="timeline">
            {timeline.map((item, i) => (
              <AnimSection key={item.year} delay={i * 0.1} className={`timeline__item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline__dot" />
                <div className="timeline__card">
                  <span className="timeline__year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="section about-team">
        <div className="container">
          <AnimSection><h2 className="section-title">Meet the Team</h2></AnimSection>
          <AnimSection delay={0.1}><p className="section-subtitle">The passionate people behind Velvet Boutique</p></AnimSection>
          <div className="team-grid">
            {team.map((m, i) => (
              <AnimSection key={m.name} delay={i * 0.1}>
                <div className="team-card">
                  <div className="team-card__avatar">{m.emoji}</div>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIG STATEMENT ═══ */}
      <section className="section about-statement">
        <div className="container">
          <AnimSection>
            <blockquote className="big-quote">
              "We don't follow trends — we help you <em>create</em> them."
              <cite>— Devika S, Founder</cite>
            </blockquote>
          </AnimSection>
        </div>
      </section>
    </>
  )
}
