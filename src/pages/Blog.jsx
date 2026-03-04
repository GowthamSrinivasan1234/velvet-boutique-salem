import { useState } from 'react'
import useInView from '../hooks/useInView'
import './Blog.css'

function AnimSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-fade-up' : ''}`}
      style={{ opacity: inView ? undefined : 0, animationDelay: `${delay}s` }}>{children}</div>
  )
}

const blogPosts = [
  {
    id: 1,
    title: '10 Spring Trends You Need to Know',
    excerpt: 'From bold florals to statement sleeves, here are the must-have trends that will dominate this season and beyond.',
    date: 'Mar 1, 2026',
    category: 'Trends',
    readTime: '5 min read',
    emoji: '🌸',
    color: '#D6336C',
  },
  {
    id: 2,
    title: 'How to Build a Capsule Wardrobe',
    excerpt: 'Simplify your style without sacrificing personality. Our step-by-step guide to a wardrobe that works harder.',
    date: 'Feb 20, 2026',
    category: 'Style Tips',
    readTime: '7 min read',
    emoji: '👗',
    color: '#8B1A4A',
  },
  {
    id: 3,
    title: 'Accessorizing 101: From Day to Night',
    excerpt: 'Transform any outfit with the right accessories. Learn the art of layering necklaces, mixing metals, and more.',
    date: 'Feb 14, 2026',
    category: 'Guides',
    readTime: '4 min read',
    emoji: '💎',
    color: '#B197FC',
  },
  {
    id: 4,
    title: 'Sustainable Fashion: Our Commitment',
    excerpt: 'Fashion shouldn\'t cost the earth. Discover how Velvet Boutique is leading the charge towards greener fashion.',
    date: 'Feb 5, 2026',
    category: 'Sustainability',
    readTime: '6 min read',
    emoji: '🌿',
    color: '#20C997',
  },
  {
    id: 5,
    title: 'Behind the Scenes: Our NYC Flagship',
    excerpt: 'A look inside our new Fashion Avenue store — from the pink velvet fitting rooms to the champagne bar.',
    date: 'Jan 28, 2026',
    category: 'News',
    readTime: '3 min read',
    emoji: '🏬',
    color: '#F5A623',
  },
  {
    id: 6,
    title: 'Color Theory: Dressing for Your Palette',
    excerpt: 'Find your best colors and learn how to create harmonious outfits that make your complexion glow.',
    date: 'Jan 15, 2026',
    category: 'Style Tips',
    readTime: '8 min read',
    emoji: '🎨',
    color: '#4DABF7',
  },
]

const categories = ['All', 'Trends', 'Style Tips', 'Guides', 'Community', 'News']

export default function Blog() {
  const [activeCat, setActiveCat] = useState('All')

  const filtered = activeCat === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCat)

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="blog-hero">
        <div className="container">
          <AnimSection>
            <span className="hero__badge">✦ Style Journal</span>
            <h1 className="blog-hero__title">
              The Velvet <span className="blog-hero__accent">Journal</span>
            </h1>
            <p className="blog-hero__desc">
              Trends, tips, and behind-the-scenes stories from the world of Velvet Boutique.
            </p>
          </AnimSection>
        </div>
      </section>

      <section className="section blog-section">
        <div className="container">
          {/* ── Category Filter ── */}
          <div className="blog-cats">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${activeCat === cat ? 'active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Featured Post ── */}
          {filtered.length > 0 && (
            <AnimSection>
              <article className="blog-featured" style={{ '--accent': filtered[0].color }}>
                <div className="blog-featured__img">
                  <span>{filtered[0].emoji}</span>
                </div>
                <div className="blog-featured__content">
                  <div className="blog-card__meta">
                    <span className="blog-card__cat">{filtered[0].category}</span>
                    <span>{filtered[0].date}</span>
                    <span>{filtered[0].readTime}</span>
                  </div>
                  <h2>{filtered[0].title}</h2>
                  <p>{filtered[0].excerpt}</p>
                  <button className="btn btn-primary">Read Article →</button>
                </div>
              </article>
            </AnimSection>
          )}

          {/* ── Grid ── */}
          <div className="blog-grid">
            {filtered.slice(1).map((post, i) => (
              <AnimSection key={post.id} delay={i * 0.1}>
                <article className="blog-card" style={{ '--accent': post.color }}>
                  <div className="blog-card__img">
                    <span>{post.emoji}</span>
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span className="blog-card__cat">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="blog-card__read">Read more →</span>
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
