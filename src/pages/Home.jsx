import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'
import './Home.css'

/* ── Reusable animated section wrapper ── */
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

/* ── Category data ── */
const categories = [
  { name: 'Dresses', emoji: '👗', color: '#D6336C', count: '120+ styles' },
  { name: 'Accessories', emoji: '👜', color: '#F5A623', count: '80+ pieces' },
  { name: 'Shoes', emoji: '👠', color: '#20C997', count: '60+ pairs' },
  { name: 'Jewelry', emoji: '💎', color: '#4DABF7', count: '90+ items' },
]

/* ── Featured products ── */
const featured = [
  { id: 1, name: 'Silk Maxi Dress', price: '$189', tag: 'New', color: '#D6336C',
    desc: 'Flowing silk elegance for unforgettable evenings' },
  { id: 2, name: 'Velvet Clutch', price: '$79', tag: 'Bestseller', color: '#8B1A4A',
    desc: 'Hand-crafted velvet with gold chain detail' },
  { id: 3, name: 'Crystal Earrings', price: '$59', tag: 'Trending', color: '#B197FC',
    desc: 'Swarovski crystal drops that catch every light' },
  { id: 4, name: 'Leather Heels', price: '$145', tag: 'Limited', color: '#F5A623',
    desc: 'Italian leather stilettos, handmade to perfection' },
]

/* ── Testimonials ── */
const testimonials = [
  { name: 'Sophia R.', role: 'Fashion Blogger', text: 'Velvet Boutique has completely transformed my wardrobe. Every piece feels luxurious and unique!', avatar: '🌸' },
  { name: 'Emma T.', role: 'Stylist', text: 'The quality and curation are unmatched. My go-to for statement pieces that make clients shine.', avatar: '✨' },
  { name: 'Olivia M.', role: 'Entrepreneur', text: 'Fast delivery, gorgeous packaging, and the clothes? Absolutely stunning. 10/10 every time.', avatar: '💫' },
]

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero__bg-shapes">
          <div className="shape shape--1" />
          <div className="shape shape--2" />
          <div className="shape shape--3" />
        </div>

        <div className="container hero__inner">
          <div className="hero__content animate-fade-up">
            <span className="hero__badge">✦ New Season 2026</span>
            <h1 className="hero__title">
              Discover Your<br />
              <span className="hero__title-accent">Signature Style</span>
            </h1>
            <p className="hero__description">
              Curated collections of bold, beautiful fashion for those who dare
              to stand out. Every piece tells a story.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn-primary">
                Explore Collections →
              </Link>
              <Link to="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>

            <div className="hero__stats">
              {[['500+', 'Products'], ['10k+', 'Customers'], ['4.8★', 'Rating']].map(([num, label]) => (
                <div key={label} className="hero__stat">
                  <strong>{num}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__visual animate-scale-in delay-2">
            <div className="hero__card hero__card--main">
              <div className="hero__card-img">👗</div>
              <div className="hero__card-info">
                <span>Spring Collection</span>
                <strong>From $89</strong>
              </div>
            </div>
            <div className="hero__card hero__card--float1">
              <span className="float-emoji">👜</span>
            </div>
            <div className="hero__card hero__card--float2">
              <span className="float-emoji">💎</span>
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <span>Scroll to explore</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="section categories">
        <div className="container">
          <AnimSection><h2 className="section-title">Shop by Category</h2></AnimSection>
          <AnimSection delay={0.1}><p className="section-subtitle">Find exactly what you're looking for across our carefully curated categories</p></AnimSection>
          <div className="categories__grid">
            {categories.map((cat, i) => (
              <AnimSection key={cat.name} delay={i * 0.1}>
                <Link to="/products" className="category-card" style={{ '--accent': cat.color }}>
                  <span className="category-card__emoji">{cat.emoji}</span>
                  <h3>{cat.name}</h3>
                  <p>{cat.count}</p>
                  <span className="category-card__arrow">→</span>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED ═══ */}
      <section className="section featured">
        <div className="container">
          <AnimSection><h2 className="section-title">Featured Picks</h2></AnimSection>
          <AnimSection delay={0.1}><p className="section-subtitle">Handpicked favorites our stylists are loving right now</p></AnimSection>
          <div className="featured__grid">
            {featured.map((item, i) => (
              <AnimSection key={item.id} delay={i * 0.1}>
                <div className="product-card" style={{ '--accent': item.color }}>
                  <div className="product-card__img">
                    <span className="product-card__tag">{item.tag}</span>
                    <div className="product-card__placeholder">{categories.find(c => item.name.toLowerCase().includes(c.name.toLowerCase().slice(0,-2)))?.emoji || '✦'}</div>
                    <div className="product-card__overlay">
                      <button className="btn btn-primary">Quick View</button>
                    </div>
                  </div>
                  <div className="product-card__info">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <div className="product-card__footer">
                      <strong>{item.price}</strong>
                      <button className="product-card__heart" aria-label="Add to wishlist">♡</button>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE BANNER ═══ */}
      <section className="marquee-banner">
        <div className="marquee-track">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="marquee-content">
              <span>★ Free Shipping Over $100</span>
              <span>★ New Arrivals Weekly</span>
              <span>★ Easy Returns</span>
              <span>★ Exclusive Member Perks</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section testimonials">
        <div className="container">
          <AnimSection><h2 className="section-title">What Our Customers Say</h2></AnimSection>
          <AnimSection delay={0.1}><p className="section-subtitle">Real stories from real style lovers</p></AnimSection>
          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <AnimSection key={t.name} delay={i * 0.15}>
                <div className="testimonial-card">
                  <div className="testimonial-card__stars">★★★★★</div>
                  <p className="testimonial-card__text">"{t.text}"</p>
                  <div className="testimonial-card__author">
                    <span className="testimonial-card__avatar">{t.avatar}</span>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section cta-section">
        <div className="container">
          <AnimSection>
            <div className="cta-box">
              <h2>Join the Velvet Family</h2>
              <p>Subscribe to our newsletter for early access, exclusive offers, and style inspiration delivered straight to your inbox.</p>
              <form className="cta-form" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" className="cta-input" />
                <button type="submit" className="btn btn-accent">Subscribe ✦</button>
              </form>
            </div>
          </AnimSection>
        </div>
      </section>
    </>
  )
}
