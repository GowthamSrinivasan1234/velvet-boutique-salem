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

// RSS Feed sources - Using reliable feeds that work with rss2json
const RSS_FEEDS = [
  // Fashion & Style News
  { url: 'https://www.businessoffashion.com/feed', category: 'Industry Facts', emoji: '📊', color: '#20C997' },
  { url: 'https://wwd.com/feed/', category: 'Style News', emoji: '💄', color: '#8B1A4A' },
  { url: 'https://www.thecut.com/tags/fashion/rss', category: 'Fashion Trends', emoji: '👗', color: '#D6336C' },
  { url: 'https://fashionista.com/.rss/full/', category: 'Style News', emoji: '✨', color: '#F5A623' },
  // Women Empowerment & Lifestyle
  { url: 'https://www.forbes.com/women/feed/', category: 'Women Power', emoji: '💪', color: '#B197FC' },
  { url: 'https://www.glamour.com/feed/rss', category: 'Luxury Fashion', emoji: '💎', color: '#E8A838' },
]

// Categories for tabs
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

// Smart categorization based on article content
const smartCategorize = (title = '', description = '', defaultCategory = 'Style News') => {
  const text = (title + ' ' + description).toLowerCase()
  
  // Women Power keywords
  if (text.includes('women') || text.includes('female') || text.includes('woman') || 
      text.includes('girl power') || text.includes('feminist') || text.includes('empowerment') ||
      text.includes('ceo') || text.includes('leader') || text.includes('entrepreneur')) {
    return 'Women Power'
  }
  
  // Industry Facts keywords
  if (text.includes('billion') || text.includes('million') || text.includes('market') ||
      text.includes('industry') || text.includes('business') || text.includes('revenue') ||
      text.includes('report') || text.includes('statistics') || text.includes('growth') ||
      text.includes('economy') || text.includes('investment') || text.includes('sales')) {
    return 'Industry Facts'
  }
  
  // Luxury Fashion keywords
  if (text.includes('luxury') || text.includes('designer') || text.includes('couture') ||
      text.includes('gucci') || text.includes('chanel') || text.includes('louis vuitton') ||
      text.includes('prada') || text.includes('dior') || text.includes('hermès') ||
      text.includes('high-end') || text.includes('exclusive')) {
    return 'Luxury Fashion'
  }
  
  // Fashion Trends keywords
  if (text.includes('trend') || text.includes('spring') || text.includes('summer') ||
      text.includes('fall') || text.includes('winter') || text.includes('season') ||
      text.includes('runway') || text.includes('collection') || text.includes('fashion week')) {
    return 'Fashion Trends'
  }
  
  return defaultCategory
}

// Helper to get emoji based on category
const getEmoji = (category) => {
  const emojis = {
    'Fashion Trends': '👗',
    'Style News': '✨',
    'Industry Facts': '📊',
    'Women Power': '💪',
    'Luxury Fashion': '💎',
  }
  return emojis[category] || '👗'
}

// Helper to get color based on category
const getColor = (category) => {
  const colors = {
    'Fashion Trends': '#D6336C',
    'Style News': '#8B1A4A',
    'Industry Facts': '#20C997',
    'Women Power': '#B197FC',
    'Luxury Fashion': '#F5A623',
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
              return data.items.slice(0, 5).map((item, idx) => {
                const description = item.description?.replace(/<[^>]*>/g, '') || ''
                const category = smartCategorize(item.title, description, feed.category)
                return {
                  id: `${feed.category}-${idx}-${Date.now()}-${Math.random()}`,
                  title: item.title,
                  excerpt: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
                  date: formatDate(item.pubDate),
                  category: category,
                  readTime: getReadTime(description),
                  emoji: getEmoji(category),
                  color: getColor(category),
                  link: item.link,
                  thumbnail: item.thumbnail || item.enclosure?.link || null,
                  source: data.feed?.title || 'Fashion News',
                }
              })
            }
            return []
          } catch (err) {
            console.log(`Failed to fetch from ${feed.url}:`, err)
            return []
          }
        })

        const results = await Promise.all(feedPromises)
        let allPosts = results.flat().filter(post => post.title && post.link)
        
        // Ensure we have posts for each category
        const postsByCategory = {}
        categories.forEach(cat => {
          if (cat !== 'All') {
            postsByCategory[cat] = allPosts.filter(p => p.category === cat)
          }
        })
        
        // If any category is empty, redistribute some posts
        const emptyCategories = Object.keys(postsByCategory).filter(cat => postsByCategory[cat].length === 0)
        const fullCategories = Object.keys(postsByCategory).filter(cat => postsByCategory[cat].length > 2)
        
        emptyCategories.forEach((emptyCat, idx) => {
          if (fullCategories.length > idx) {
            const sourceCat = fullCategories[idx]
            // Take one post and reassign its category
            const postToMove = postsByCategory[sourceCat].pop()
            if (postToMove) {
              postToMove.category = emptyCat
              postToMove.emoji = getEmoji(emptyCat)
              postToMove.color = getColor(emptyCat)
              postsByCategory[emptyCat] = [postToMove]
            }
          }
        })
        
        // Flatten back and shuffle
        allPosts = Object.values(postsByCategory).flat()
        const shuffled = allPosts.sort(() => Math.random() - 0.5)
        
        if (shuffled.length > 0) {
          setPosts(shuffled)
          setError(false)
        } else {
          throw new Error('No posts fetched')
        }
      } catch (err) {
        console.error('Failed to fetch news:', err)
        // Use fallback NewsAPI data (genuine news sources)
        setError(true)
        setPosts([])
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
              <p>📡 Unable to fetch live news. Please visit these trusted sources directly:</p>
              <div className="blog-external-links">
                <a href="https://www.vogue.com/fashion" target="_blank" rel="noopener noreferrer">Vogue</a>
                <a href="https://wwd.com/" target="_blank" rel="noopener noreferrer">WWD</a>
                <a href="https://www.businessoffashion.com/" target="_blank" rel="noopener noreferrer">Business of Fashion</a>
                <a href="https://www.forbes.com/women/" target="_blank" rel="noopener noreferrer">Forbes Women</a>
              </div>
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
                  {filtered[0].source && <span className="blog-source">Source: {filtered[0].source}</span>}
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
                        {post.source && <span className="blog-source">Source: {post.source}</span>}
                        <span className="blog-card__read">Read more →</span>
                      </div>
                    </article>
                  </a>
                </AnimSection>
              ))}
            </div>
          )}

          {/* ── No Results ── */}
          {!loading && filtered.length === 0 && !error && (
            <div className="blog-empty">
              <p>No articles found in "{activeCat}" category at the moment.</p>
              <button className="btn btn-outline" onClick={() => setActiveCat('All')}>
                View All Articles
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
