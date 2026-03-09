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
  { id: 1,  name: 'Designer Silk Saree',          price: 440,   cat: 'Sarees',            tag: 'Bestseller',   emoji: '🥻', color: '#753580', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  { id: 2,  name: 'Designer Pattu Saree',         price: 440,   cat: 'Sarees',            tag: 'Popular',      emoji: '🥻', color: '#9B4DCA', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80' },
  { id: 3,  name: 'Designer Wedding Saree',       price: 440,   cat: 'Sarees',            tag: 'Premium',      emoji: '🥻', color: '#E8A838', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80' },
  { id: 4,  name: 'Designer Cotton Saree',        price: 440,   cat: 'Sarees',            tag: 'New',          emoji: '🥻', color: '#753580', image: 'https://images.unsplash.com/photo-1617627143233-46b828b82442?w=400&q=80' },

  /* ── Custom Stitching ── */
  { id: 5,  name: 'Blouse Stitching',             price: 350,   cat: 'Custom Stitching',  tag: 'Most Popular', emoji: '✂️', color: '#753580', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80' },
  { id: 6,  name: 'Chudidar Stitching',           price: 450,   cat: 'Custom Stitching',  tag: 'Bestseller',   emoji: '✂️', color: '#9B4DCA', image: 'https://images.unsplash.com/photo-1583391733981-8b530c48b9a1?w=400&q=80' },
  { id: 7,  name: 'Lehanga Stitching',            price: 1100,  cat: 'Custom Stitching',  tag: 'Premium',      emoji: '✂️', color: '#E8A838', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
  { id: 8,  name: 'Frock Stitching',              price: 400,   cat: 'Custom Stitching',  tag: 'Popular',      emoji: '✂️', color: '#753580', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80' },
  { id: 9,  name: 'Skirt & Top Stitching',        price: 700,   cat: 'Custom Stitching',  tag: 'Trending',     emoji: '✂️', color: '#9B4DCA', image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&q=80' },
  { id: 10, name: 'Top Stitching',                price: 400,   cat: 'Custom Stitching',  tag: 'New',          emoji: '✂️', color: '#E8A838', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80' },
  { id: 11, name: 'Baby Frock Stitching',         price: 400,   cat: 'Custom Stitching',  tag: 'Popular',      emoji: '✂️', color: '#753580', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80' },
  { id: 12, name: 'Kids Wear Stitching',          price: 150,   cat: 'Custom Stitching',  tag: 'New',          emoji: '✂️', color: '#9B4DCA', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80' },
  { id: 13, name: 'Skirt Stitching',              price: 300,   cat: 'Custom Stitching',  tag: 'Popular',      emoji: '✂️', color: '#E8A838', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aebd?w=400&q=80' },

  /* ── Aari & Embroidery ── */
  { id: 14, name: 'Aari Work',                    price: 600,   cat: 'Aari & Embroidery', tag: 'Bestseller',   emoji: '🪡', color: '#753580', image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400&q=80' },
  { id: 15, name: 'Designer Aari Bridal Work',    price: 600,   cat: 'Aari & Embroidery', tag: 'Premium',      emoji: '🪡', color: '#9B4DCA', image: 'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=400&q=80' },
  { id: 16, name: 'Machine Embroidery',           price: 850,   cat: 'Aari & Embroidery', tag: 'New',          emoji: '🪡', color: '#E8A838', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8e?w=400&q=80' },
  { id: 17, name: 'Painting Work',                price: 500,   cat: 'Aari & Embroidery', tag: 'Custom',       emoji: '🎨', color: '#753580', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80' },

  /* ── Jewellery ── */
  { id: 18, name: 'Neck Piece',                   price: 200,   cat: 'Jewellery',         tag: 'Trending',     emoji: '📿', color: '#753580', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80' },
  { id: 19, name: 'Pendant',                      price: 170,   cat: 'Jewellery',         tag: 'Popular',      emoji: '💎', color: '#9B4DCA', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  { id: 20, name: 'Earrings',                     price: 390,   cat: 'Jewellery',         tag: 'Bestseller',   emoji: '✨', color: '#E8A838', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80' },
  { id: 21, name: 'Tassel',                       price: 500,   cat: 'Jewellery',         tag: 'New',          emoji: '🎀', color: '#753580', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80' },
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
                      <img src={item.image} alt={item.name} className="product-card__thumbnail" loading="lazy" />
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
