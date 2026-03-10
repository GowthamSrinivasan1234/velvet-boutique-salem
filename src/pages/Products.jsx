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
  /* ── Sarees ── */
  { id: 1,  name: 'Designer Silk Saree',          price: 440,   cat: 'Sarees',            tag: 'Bestseller',   emoji: '🥻', color: '#753580', image: '/images/DesignerSaree.webp' },
  { id: 4,  name: 'Designer Cotton Saree',        price: 440,   cat: 'Sarees',            tag: 'New',          emoji: '🥻', color: '#9B4DCA', image: '/images/cottonsaree.jpeg' },

  /* ── Custom Stitching ── */
  { id: 5,  name: 'Designer Blouse',              price: 350,   cat: 'Custom Stitching',  tag: 'Most Popular', emoji: '✂️', color: '#753580', image: '/images/designer blouse.jpeg' },
  { id: 6,  name: 'Chudidar Stitching',           price: 450,   cat: 'Custom Stitching',  tag: 'Bestseller',   emoji: '✂️', color: '#9B4DCA', image: '/images/Chudidar.jpg' },
  { id: 7,  name: 'Lehanga Stitching',            price: 1100,  cat: 'Custom Stitching',  tag: 'Premium',      emoji: '✂️', color: '#E8A838', image: '/images/Lehanga.jpeg' },
  { id: 8,  name: 'Frock Stitching',              price: 400,   cat: 'Custom Stitching',  tag: 'Popular',      emoji: '✂️', color: '#753580', image: '/images/frock.jpeg' },
  { id: 9,  name: 'Skirt & Top Stitching',        price: 700,   cat: 'Custom Stitching',  tag: 'Trending',     emoji: '✂️', color: '#9B4DCA', image: '/images/top&skirt.jpeg' },
  { id: 11, name: 'Baby Frock Stitching',         price: 400,   cat: 'Custom Stitching',  tag: 'Popular',      emoji: '✂️', color: '#E8A838', image: '/images/kidsDress.jpeg' },
  { id: 12, name: 'Kids Wear Stitching',          price: 150,   cat: 'Custom Stitching',  tag: 'New',          emoji: '✂️', color: '#753580', image: '/images/kids top and skirt.jpeg' },

  /* ── Aari & Embroidery ── */
  { id: 14, name: 'Aari Work',                    price: 600,   cat: 'Aari & Embroidery', tag: 'Bestseller',   emoji: '🪡', color: '#753580', image: '/images/Aari work.jpeg' },
  { id: 15, name: 'Designer Aari Bridal Work',    price: 600,   cat: 'Aari & Embroidery', tag: 'Premium',      emoji: '🪡', color: '#9B4DCA', image: '/images/Bridal Aari work.jpeg' },
  { id: 17, name: 'Painting Work',                price: 500,   cat: 'Aari & Embroidery', tag: 'Custom',       emoji: '🎨', color: '#E8A838', image: '/images/painting blouse.jpeg' },

  /* ── Jewellery ── */
  { id: 18, name: 'Neck Piece',                   price: 200,   cat: 'Jewellery',         tag: 'Trending',     emoji: '📿', color: '#753580', image: '/images/neckpiece.jpeg' },
  { id: 19, name: 'Pendant',                      price: 170,   cat: 'Jewellery',         tag: 'Popular',      emoji: '💎', color: '#9B4DCA', image: '/images/pendent.jpeg' },
  { id: 20, name: 'Earrings',                     price: 390,   cat: 'Jewellery',         tag: 'Bestseller',   emoji: '✨', color: '#E8A838', image: '/images/earrings.jpeg' },
  { id: 21, name: 'Bridal Set',                   price: 500,   cat: 'Jewellery',         tag: 'New',          emoji: '🎀', color: '#753580', image: '/images/bridalset.jpeg' },
]

const categories = ['All', 'Sarees', 'Custom Stitching', 'Aari & Embroidery', 'Jewellery']
const sortOptions = ['Featured', 'Price: Low → High', 'Price: High → Low', 'Newest']

export default function Products() {
  const [activeCat, setActiveCat] = useState('All')
  const [sort, setSort] = useState('Featured')
  const [wishlist, setWishlist] = useState(new Set())

  const openWhatsApp = (item) => {
    const msg = `Hi! I'm interested in *${item.name}* (${item.cat}) starting from ₹${item.price.toLocaleString('en-IN')}. Could you share more details?`
    window.open(`https://wa.me/919345188551?text=${encodeURIComponent(msg)}`, '_blank')
  }

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
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="product-card__image" />
                    ) : (
                      <div className="product-card__placeholder">{item.emoji}</div>
                    )}
                    <div className="product-card__overlay">
                      <button className="btn btn-primary" onClick={() => openWhatsApp(item)}>Enquire on WhatsApp</button>
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
                    <strong>From ₹{item.price.toLocaleString('en-IN')}</strong>
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
