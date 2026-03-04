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
  /* ── Sarees (67 sold · ₹440–₹9,180) ── */
  { id: 1,  name: 'Designer Silk Saree',          price: 4230,  cat: 'Sarees',            tag: 'Bestseller',   emoji: '🥻', color: '#753580' },
  { id: 2,  name: 'Designer Pattu Saree',         price: 2865,  cat: 'Sarees',            tag: 'Popular',      emoji: '🥻', color: '#9B4DCA' },
  { id: 3,  name: 'Designer Wedding Saree',       price: 9180,  cat: 'Sarees',            tag: 'Premium',      emoji: '🥻', color: '#E8A838' },
  { id: 4,  name: 'Designer Cotton Saree',        price: 1680,  cat: 'Sarees',            tag: 'New',          emoji: '🥻', color: '#753580' },

  /* ── Custom Stitching (1,100+ orders) ── */
  { id: 5,  name: 'Blouse Stitching',             price: 850,   cat: 'Custom Stitching',  tag: 'Most Popular', emoji: '✂️', color: '#753580' },
  { id: 6,  name: 'Chudidar Stitching',           price: 780,   cat: 'Custom Stitching',  tag: 'Bestseller',   emoji: '✂️', color: '#9B4DCA' },
  { id: 7,  name: 'Lehanga Stitching',            price: 1420,  cat: 'Custom Stitching',  tag: 'Premium',      emoji: '✂️', color: '#E8A838' },
  { id: 8,  name: 'Frock Stitching',              price: 960,   cat: 'Custom Stitching',  tag: 'Popular',      emoji: '✂️', color: '#753580' },
  { id: 9,  name: 'Skirt & Top Stitching',        price: 1240,  cat: 'Custom Stitching',  tag: 'Trending',     emoji: '✂️', color: '#9B4DCA' },
  { id: 10, name: 'Top Stitching',                price: 620,   cat: 'Custom Stitching',  tag: 'New',          emoji: '✂️', color: '#E8A838' },
  { id: 11, name: 'Baby Frock Stitching',         price: 900,   cat: 'Custom Stitching',  tag: 'Popular',      emoji: '✂️', color: '#753580' },
  { id: 12, name: 'Kids Wear Stitching',          price: 990,   cat: 'Custom Stitching',  tag: 'New',          emoji: '✂️', color: '#9B4DCA' },
  { id: 13, name: 'Skirt Stitching',              price: 620,   cat: 'Custom Stitching',  tag: 'Popular',      emoji: '✂️', color: '#E8A838' },

  /* ── Aari & Embroidery (100+ designs · ₹600–₹15,400) ── */
  { id: 14, name: 'Aari Work',                    price: 4440,  cat: 'Aari & Embroidery', tag: 'Bestseller',   emoji: '🪡', color: '#753580' },
  { id: 15, name: 'Designer Aari Bridal Work',    price: 15400, cat: 'Aari & Embroidery', tag: 'Premium',      emoji: '🪡', color: '#9B4DCA' },
  { id: 16, name: 'Machine Embroidery',           price: 875,   cat: 'Aari & Embroidery', tag: 'New',          emoji: '🪡', color: '#E8A838' },
  { id: 17, name: 'Painting Work',                price: 1810,  cat: 'Aari & Embroidery', tag: 'Custom',       emoji: '🎨', color: '#753580' },

  /* ── Jewellery (80+ pieces · ₹170–₹2,480) ── */
  { id: 18, name: 'Neck Piece',                   price: 1190,  cat: 'Jewellery',         tag: 'Trending',     emoji: '📿', color: '#753580' },
  { id: 19, name: 'Pendant',                      price: 790,   cat: 'Jewellery',         tag: 'Popular',      emoji: '💎', color: '#9B4DCA' },
  { id: 20, name: 'Earrings',                     price: 690,   cat: 'Jewellery',         tag: 'Bestseller',   emoji: '✨', color: '#E8A838' },
  { id: 21, name: 'Tassel',                       price: 680,   cat: 'Jewellery',         tag: 'New',          emoji: '🎀', color: '#753580' },
]

const categories = ['All', 'Sarees', 'Custom Stitching', 'Aari & Embroidery', 'Jewellery']
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
              Designer sarees, custom stitching, aari embroidery & fashion jewellery — all under one roof.
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
