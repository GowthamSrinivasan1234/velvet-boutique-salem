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
  { icon: '✂️', title: 'Expert Stitching', desc: 'From blouse to lehenga — 1,100+ custom stitching orders delivered with perfection.' },
  { icon: '🪡', title: 'Aari Artistry', desc: 'Exquisite aari embroidery handcrafted by skilled artisans — our signature craft.' },
  { icon: '💎', title: 'Fashion Jewellery', desc: 'Elegant neck pieces, pendants & earrings handpicked to complement every outfit.' },
  { icon: '💜', title: 'Her Store Her Style', desc: 'A women-owned boutique empowering every woman to express her unique style.' },
]

const timeline = [
  { year: 'Oct 2024', title: 'The Studio Begins', desc: 'Velvet Boutique was born as a small stitching studio in Salem — just a sewing machine, a dream, and a passion for fashion.' },
  { year: 'Nov 2024', title: 'First Customers', desc: 'Word spread fast! Our blouse stitching and chudidar orders won hearts in the very first weeks.' },
  { year: 'Jan 2025', title: 'Expanding the Craft', desc: 'Added fashion jewellery to our collection. The boutique was growing beyond stitching.' },
  { year: 'Jul 2025', title: 'Aari Work Launches', desc: 'Introduced our signature aari embroidery — intricate handcrafted designs that became an instant favourite.' },
  { year: 'Oct 2025', title: 'The Big Leap', desc: 'Velvet Boutique became Salem\'s go-to fashion destination with hundreds of happy customers every month.' },
  { year: 'Dec 2025', title: 'Record-Breaking Month', desc: 'Our busiest month ever! From a small studio to Salem\'s most loved boutique in just 14 months.' },
  { year: '2026', title: 'Going Digital', desc: 'Launched our website — bringing Her Store Her Style to the world. The journey continues!' },
]

const team = [
  { name: 'Devika S', role: 'Founder & Creative Director', emoji: '\u{1F469}\u{200D}\u{1F3A8}' },
  { name: 'Lalith S', role: 'Co-Founder & Head of Operations', emoji: '\u{1F469}\u{200D}\u{1F4BC}' },
  { name: 'Kamaran', role: 'Lead Stylist', emoji: '\u2702\uFE0F' },
  { name: 'Nandhini R', role: 'Digital & Brand Manager', emoji: '\u{1F469}\u{200D}\u{1F4BB}' },
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
              <span className="about-hero__accent">Her Store Her Style</span>
            </h1>
            <p className="about-hero__desc">
              What started as a small stitching studio in October 2024 has grown into
              Salem's most loved fashion boutique. Velvet Boutique is a proud women-owned
              brand — 2,000+ items crafted, 600+ happy customers, and counting.
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
          <AnimSection delay={0.1}><p className="section-subtitle">From a small stitching studio to Salem's most loved boutique — here's how we got here</p></AnimSection>
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
              "Her Store, <em>Her Style</em> — every stitch tells her story."
              <cite>— Devika S, Founder · Since October 2024</cite>
            </blockquote>
          </AnimSection>
        </div>
      </section>
    </>
  )
}
