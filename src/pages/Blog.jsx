import { useState, useEffect } from 'react'
import useInView from '../hooks/useInView'
import './Blog.css'

function AnimSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-fade-up' : ''}`}
      style={{ opacity: inView ? undefined : 0, animationDelay: `${delay}s` }}>{children}</div>
  )
}

// RSS Feed sources for different categories
const RSS_FEEDS = [
  { url: 'https://www.vogue.com/feed/rss', category: 'Fashion Trends', emoji: '👗', color: '#D6336C' },
  { url: 'https://www.elle.com/rss/all.xml/', category: 'Style News', emoji: '💄', color: '#8B1A4A' },
  { url: 'https://www.harpersbazaar.com/rss/all.xml/', category: 'Luxury Fashion', emoji: '💎', color: '#B197FC' },
  { url: 'https://www.refinery29.com/en-us/fashion/rss.xml', category: 'Trends', emoji: '🌸', color: '#F5A623' },
  { url: 'https://fashionista.com/.rss/full/', category: 'Industry News', emoji: '🏬', color: '#4DABF7' },
]

// Fallback static posts (shown when API fails)
const fallbackPosts = [
  {
    id: 'f1',
    title: 'Spring 2026: Bold Colors Take Center Stage',
    excerpt: 'From vibrant pinks to electric blues, this season\'s runways are all about making a statement with color.',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: 'Fashion Trends',
    readTime: '4 min read',
    emoji: '🌸',
    color: '#D6336C',
    link: 'https://www.vogue.com/fashion',
  },
  {
    id: 'f2',
    title: 'Women Leading the Fashion Industry Revolution',
    excerpt: 'Meet the female designers, CEOs, and creatives who are reshaping the future of fashion.',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: 'Women Power',
    readTime: '6 min read',
    emoji: '💪',
    color: '#8B1A4A',
    link: 'https://www.elle.com/fashion/',
  },
  {
    id: 'f3',
    title: 'Sustainable Fashion: The $350 Billion Opportunity',
    excerpt: 'The global fashion industry is pivoting towards sustainability. Here\'s what you need to know.',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: 'Industry Facts',
    readTime: '5 min read',
    emoji: '🌿',
    color: '#20C997',
    link: 'https://www.harpersbazaar.com/fashion/',
  },
  {
    id: 'f4',
    title: 'Indian Designers Making Waves Globally',
    excerpt: 'From Sabyasachi to Manish Malhotra, Indian fashion is captivating the world stage.',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: 'Style News',
    readTime: '4 min read',
    emoji: '🇮🇳',
    color: '#F5A623',
    link: 'https://www.vogue.in/fashion',
  },
]

const categories = ['All', 'Fashion Trends', 'Style News', 'Industry Facts', 'Women Power', 'Luxury Fashion']

// Helper to calculate read time
const getReadTime = (text) => {
  const words = text?.split(' ').length || 100
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

// Helper to format date
const formatDate = (dateStr) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
}

// Helper to get emoji based on content
const getEmoji = (title = '', category = '') => {
  const text = (title + category).toLowerCase()
  if (text.includes('women') || text.includes('female') || text.includes('girl')) return '💪'
  if (text.includes('sustainable') || text.includes('eco') || text.includes('green')) return '🌿'
  if (text.includes('luxury') || text.includes('designer')) return '💎'
  if (text.includes('trend') || text.includes('spring') || text.includes('summer')) return '🌸'
  if (text.includes('beauty') || text.includes('makeup')) return '💄'
  if (text.includes('accessory') || text.includes('jewelry') || text.includes('bag')) return '👜'
  if (text.includes('runway') || text.includes('show') || text.includes('week')) return '🏬'
  if (text.includes('celeb') || text.includes('star')) return '⭐'
  return '👗'
}

// Helper to get color based on category
const getColor = (category) => {
  const colors = {
    'Fashion Trends': '#D6336C',
    'Style News': '#8B1A4A',
    'Industry Facts': '#20C997',
    'Women Power': '#B197FC',
    'Luxury Fashion': '#F5A623',
    'Trends': '#D6336C',
  }
  return colors[category] || '#4DABF7'
}

export default function Blog() {
  const [activeCat, setActiveCat] = useState('All')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        // Use rss2json API to convert RSS feeds to JSON
        const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url='
        
        // Fetch from multiple sources in parallel
        const feedPromises = RSS_FEEDS.map(async (feed) => {
          try {
            const response = await fetch(`${RSS2JSON_API}${encodeURIComponent(feed.url)}`)
            const data = await response.json()
            
            if (data.status === 'ok' && data.items) {
              return data.items.slice(0, 3).map((item, idx) => ({
                id: `${feed.category}-${idx}-${Date.now()}`,
                title: item.title,
                excerpt: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                date: formatDate(item.pubDate),
                category: feed.category,
                readTime: getReadTime(item.description),
                emoji: getEmoji(item.title, feed.category),
                color: feed.color,
                link: item.link,
                thumbnail: item.thumbnail || item.enclosure?.link || null,
              }))
            }
            return []
          } catch {
            return []
          }
        })

        const results = await Promise.all(feedPromises)
        const allPosts = results.flat().filter(post => post.title && post.link)
        
        // Shuffle and limit posts
        const shuffled = allPosts.sort(() => Math.random() - 0.5).slice(0, 12)
        
        if (shuffled.length > 0) {
          setPosts(shuffled)
        } else {
          setPosts(fallbackPosts)
        }
        setError(false)
      } catch (err) {
        console.error('Failed to fetch news:', err)
        setPosts(fallbackPosts)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const filtered = activeCat === 'All' ? posts : posts.filter(p => p.category === activeCat)

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="blog-hero">
        <div className="container">
          <AnimSection>
            <span className="hero__badge">✦ Live Fashion News</span>
            <h1 className="blog-hero__title">
              The Velvet <span className="blog-hero__accent">Journal</span>
            </h1>
            <p className="blog-hero__desc">
              Latest fashion trends, industry updates, and women empowerment stories — updated daily.
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

          {/* ── Loading State ── */}
          {loading && (
            <div className="blog-loading">
              <div className="blog-loading__spinner"></div>
              <p>Fetching latest fashion news...</p>
            </div>
          )}

          {/* ── Error State ── */}
          {error && !loading && (
            <div className="blog-error">
              <p>📡 Showing curated articles. Live feed will update shortly.</p>
            </div>
          )}

          {/* ── Featured Post ── */}
          {!loading && filtered.length > 0 && (
            <AnimSection>
              <article className="blog-featured" style={{ '--accent': filtered[0].color }}>
                {filtered[0].thumbnail ? (
                  <div className="blog-featured__img blog-featured__img--real">
                    <img src={filtered[0].thumbnail} alt={filtered[0].title} />
                  </div>
                ) : (
                  <div className="blog-featured__img">
                    <span>{filtered[0].emoji}</span>
                  </div>
                )}
                <div className="blog-featured__content">
                  <div className="blog-card__meta">
                    <span className="blog-card__cat">{filtered[0].category}</span>
                    <span>{filtered[0].date}</span>
                    <span>{filtered[0].readTime}</span>
                  </div>
                  <h2>{filtered[0].title}</h2>
                  <p>{filtered[0].excerpt}</p>
                  <a href={filtered[0].link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Read Article →
                  </a>
                </div>
              </article>
            </AnimSection>
          )}

          {/* ── Grid ── */}
          {!loading && (
            <div className="blog-grid">
              {filtered.slice(1).map((post, i) => (
                <AnimSection key={post.id} delay={i * 0.1}>
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-card-link">
                    <article className="blog-card" style={{ '--accent': post.color }}>
                      {post.thumbnail ? (
                        <div className="blog-card__img blog-card__img--real">
                          <img src={post.thumbnail} alt={post.title} />
                        </div>
                      ) : (
                        <div className="blog-card__img">
                          <span>{post.emoji}</span>
                        </div>
                      )}
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
                  </a>
                </AnimSection>
              ))}
            </div>
          )}

          {/* ── No Results ── */}
          {!loading && filtered.length === 0 && (
            <div className="blog-empty">
              <p>No articles found in this category. Try selecting "All" to see all news.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
