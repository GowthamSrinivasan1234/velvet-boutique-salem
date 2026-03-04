import { useState } from 'react'
import useInView from '../hooks/useInView'
import './Products.css'

function AnimSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-fade-up' : ''}`}
      style={{ opacity: inView ? undefined : 0, animationDelay: `${delay}s` }}>{children}</div>
  )
}

const allProducts = [
  { id: 1,  name: 'Kanchipuram Silk Saree',    price: 4999, cat: 'Sarees',      tag: 'New',        emoji: '🥻',  color: '#753580' },
  { id: 2,  name: 'Banarasi Saree',            price: 3499, cat: 'Sarees',      tag: 'Bestseller', emoji: '🥻',  color: '#9B4DCA' },
  { id: 3,  name: 'Designer Anarkali Kurti',   price: 1899, cat: 'Kurtis',      tag: 'Trending',   emoji: '👗',  color: '#753580' },
  { id: 4,  name: 'Cotton Kurti Set',          price: 1299, cat: 'Kurtis',      tag: 'Bestseller', emoji: '👗',  color: '#E8A838' },
  { id: 5,  name: 'Custom Bridal Lehenga',     price: 12999,cat: 'Custom Wear', tag: 'Custom',     emoji: '✂️',  color: '#9B4DCA' },
  { id: 6,  name: 'Custom Blouse Stitching',   price: 999,  cat: 'Custom Wear', tag: 'Popular',    emoji: '✂️',  color: '#753580' },
  { id: 7,  name: 'Silk Dupatta',              price: 2499, cat: 'Accessories', tag: 'New',        emoji: '🧣',  color: '#E8A838' },
  { id: 8,  name: 'Embroidered Clutch',        price: 799,  cat: 'Accessories', tag: 'Trending',   emoji: '👜',  color: '#9B4DCA' },
  { id: 9,  name: 'Pattu Saree',               price: 5999, cat: 'Sarees',      tag: 'Premium',    emoji: '🥻',  color: '#E8A838' },
  { id: 10, name: 'Palazzo Kurti Set',         price: 1599, cat: 'Kurtis',      tag: 'New',        emoji: '👗',  color: '#20C997' },
  { id: 11, name: 'Custom Churidar',           price: 1499, cat: 'Custom Wear', tag: 'Custom',     emoji: '✂️',  color: '#E8A838' },
  { id: 12, name: 'Jhumka Earrings',           price: 599,  cat: 'Accessories', tag: 'Bestseller', emoji: '💎',  color: '#753580' },
]

const categories = ['All', 'Sarees', 'Kurtis', 'Custom Wear', 'Accessories']
const sortOptions = ['Featured', 'Price: Low → High', 'Price: High → Low', 'Newest']

export default function Products() {
  const [activeCat, setActiveCat] = useState('All')
  const [sort, setSort] = useState('Featured')
  const [wishlist, setWishlist] = useState(new Set())

  const toggleWish = id => setWishlist(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  let filtered = activeCat === 'All' ? [...allProducts] : allProducts.filter(p => p.cat === activeCat)

  if (sort === 'Price: Low → High') filtered.sort((a, b) => a.price - b.price)
  if (sort === 'Price: High → Low') filtered.sort((a, b) => b.price - a.price)
  if (sort === 'Newest') filtered.sort((a, b) => b.id - a.id)

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="products-hero">
        <div className="container">
          <AnimSection>
            <span className="hero__badge">✦ Collections</span>
            <h1 className="products-hero__title">
              Our <span className="products-hero__accent">Collections</span>
            </h1>
            <p className="products-hero__desc">
              Explore our handpicked selection of fashion-forward pieces designed to make you shine.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <section className="section products-section">
        <div className="container">
          <div className="products-toolbar">
            <div className="products-cats">
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
            <div className="products-sort">
              <select value={sort} onChange={e => setSort(e.target.value)}>
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <p className="products-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

          {/* ═══ GRID ═══ */}
          <div className="products-grid">
            {filtered.map((item, i) => (
              <AnimSection key={item.id} delay={i * 0.05}>
                <div className="product-card" style={{ '--accent': item.color }}>
                  <div className="product-card__img">
                    <span className="product-card__tag">{item.tag}</span>
                    <div className="product-card__placeholder">{item.emoji}</div>
                    <div className="product-card__overlay">
                      <button className="btn btn-primary">Quick View</button>
                    </div>
                    <button
                      className={`product-card__wish ${wishlist.has(item.id) ? 'active' : ''}`}
                      onClick={() => toggleWish(item.id)}
                      aria-label="Toggle wishlist"
                    >
                      {wishlist.has(item.id) ? '♥' : '♡'}
                    </button>
                  </div>
                  <div className="product-card__info">
                    <span className="product-card__cat">{item.cat}</span>
                    <h3>{item.name}</h3>
                    <strong>₹{item.price.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
