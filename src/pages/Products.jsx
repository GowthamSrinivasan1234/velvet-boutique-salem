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
  { id: 1,  name: 'Silk Maxi Dress',        price: 189, cat: 'Dresses',     tag: 'New',        emoji: '👗',  color: '#D6336C' },
  { id: 2,  name: 'Velvet Clutch Bag',       price: 79,  cat: 'Accessories', tag: 'Bestseller', emoji: '👜',  color: '#8B1A4A' },
  { id: 3,  name: 'Crystal Drop Earrings',   price: 59,  cat: 'Jewelry',     tag: 'Trending',   emoji: '💎',  color: '#B197FC' },
  { id: 4,  name: 'Italian Leather Heels',   price: 145, cat: 'Shoes',       tag: 'Limited',    emoji: '👠',  color: '#F5A623' },
  { id: 5,  name: 'Floral Wrap Dress',       price: 129, cat: 'Dresses',     tag: 'New',        emoji: '👗',  color: '#20C997' },
  { id: 6,  name: 'Gold Pendant Necklace',   price: 89,  cat: 'Jewelry',     tag: 'Bestseller', emoji: '💎',  color: '#D6336C' },
  { id: 7,  name: 'Suede Ankle Boots',       price: 165, cat: 'Shoes',       tag: 'New',        emoji: '👢',  color: '#8B1A4A' },
  { id: 8,  name: 'Woven Straw Tote',        price: 69,  cat: 'Accessories', tag: 'Trending',   emoji: '👜',  color: '#F5A623' },
  { id: 9,  name: 'Satin Midi Skirt',        price: 99,  cat: 'Dresses',     tag: 'Trending',   emoji: '👗',  color: '#B197FC' },
  { id: 10, name: 'Chunky Gold Bracelet',    price: 75,  cat: 'Jewelry',     tag: 'New',        emoji: '💍',  color: '#F5A623' },
  { id: 11, name: 'Platform Espadrilles',    price: 110, cat: 'Shoes',       tag: 'Bestseller', emoji: '👡',  color: '#20C997' },
  { id: 12, name: 'Leather Crossbody Bag',   price: 135, cat: 'Accessories', tag: 'Limited',    emoji: '👜',  color: '#D6336C' },
]

const categories = ['All', 'Dresses', 'Accessories', 'Shoes', 'Jewelry']
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
                    <strong>${item.price}</strong>
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
