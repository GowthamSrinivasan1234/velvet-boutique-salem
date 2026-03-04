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

/* ── Category data (from real sales report) ── */
const categories = [
  { name: 'Sarees', emoji: '🥻', color: '#753580', count: '67+ designs' },
  { name: 'Custom Stitching', emoji: '✂️', color: '#9B4DCA', count: '1,100+ orders' },
  { name: 'Aari & Embroidery', emoji: '🪡', color: '#E8A838', count: '100+ designs' },
  { name: 'Jewellery', emoji: '💎', color: '#20C997', count: '80+ pieces' },
]

/* ── Featured products (real bestsellers from sales data) ── */
const featured = [
  { id: 1, name: 'Designer Sarees', price: 'From ₹440', tag: 'Bestseller', color: '#753580', emoji: '🥻',
    desc: 'Handpicked designer sarees — silk, pattu & wedding collections for every occasion' },
  { id: 2, name: 'Blouse Stitching', price: 'From ₹350', tag: 'Most Popular', color: '#9B4DCA', emoji: '✂️',
    desc: 'Expert custom blouse stitching with perfect fit — our most loved service' },
  { id: 3, name: 'Aari Work', price: 'From ₹600', tag: 'Premium', color: '#E8A838', emoji: '🪡',
    desc: 'Exquisite aari embroidery with intricate handwork — our signature craft' },
  { id: 4, name: 'Neck Piece', price: 'From ₹200', tag: 'Trending', color: '#20C997', emoji: '📿',
    desc: 'Elegant fashion jewellery — neck pieces, pendants & earrings for every occasion' },
]

/* ── Testimonials — Real Google Reviews (4.8★) ── */
const testimonials = [
  { name: 'Priya K.', role: 'Google Review ★★★★★', text: 'Amazing collection of sarees and kurtis! The quality is outstanding and the staff is so helpful. Devika personally helped me choose the perfect outfit for my sister\'s wedding.', avatar: '🌸', rating: 5 },
  { name: 'Meena R.', role: 'Google Review ★★★★★', text: 'Best boutique in Salem! I got a custom-stitched Anarkali and it fit perfectly. The attention to detail is incredible. Will definitely come back for more.', avatar: '✨', rating: 5 },
  { name: 'Shalini V.', role: 'Google Review ★★★★★', text: 'Ordered a Kanchipuram silk saree for my engagement and it was absolutely gorgeous. Packing was beautiful too. Highly recommend Velvet Boutique for any occasion!', avatar: '💜', rating: 5 },
  { name: 'Divya S.', role: 'Google Review ★★★★★', text: 'Women-owned and wonderful! Love how they help you style complete looks. The custom designs are worth every rupee. My go-to place in Fairlands!', avatar: '💫', rating: 5 },
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
            <span className="hero__badge">✦ Her Store Her Style · Salem</span>
            <h1 className="hero__title">
              Discover Your<br />
              <span className="hero__title-accent">Signature Style</span>
            </h1>
            <p className="hero__description">
              Designer sarees, custom stitching & exquisite aari embroidery.
              Handcrafted fashion from the heart of Salem, Tamil Nadu.
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
              {[['2,000+', 'Items Sold'], ['600+', 'Happy Customers'], ['4.8★', 'Google Rating']].map(([num, label]) => (
                <div key={label} className="hero__stat">
                  <strong>{num}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__visual animate-scale-in delay-2">
            <div className="hero__card hero__card--main">
              <div className="hero__card-img">🥻</div>
              <div className="hero__card-info">
                <span>Designer Sarees</span>
                <strong>From ₹440</strong>
              </div>
            </div>
            <div className="hero__card hero__card--float1">
              <span className="float-emoji">✂️</span>
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
                    <div className="product-card__placeholder">{item.emoji}</div>
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
              <span>★ Designer Sarees Collection</span>
              <span>★ Custom Stitching Services</span>
              <span>★ Aari & Embroidery Work</span>
              <span>★ 4.8★ Google Rating</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section testimonials">
        <div className="container">
          <AnimSection><h2 className="section-title">What Our Customers Say</h2></AnimSection>
          <AnimSection delay={0.1}><p className="section-subtitle">Real reviews from our happy customers — 4.8★ on Google</p></AnimSection>
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
              <p>Follow us on Instagram for new arrivals, styling tips, and exclusive offers. Join thousands of happy customers!</p>
              <div className="cta-actions">
                <a href="https://www.instagram.com/velvet_boutique_salem/" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Follow on Instagram ✦</a>
                <a href="https://www.google.com/maps/place/Velvet+Boutique/@11.6761752,78.1437772" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{borderColor:'#fff',color:'#fff'}}>Visit Our Store →</a>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>
    </>
  )
}
