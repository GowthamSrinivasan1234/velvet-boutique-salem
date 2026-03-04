import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Collections' },
  { path: '/about', label: 'About' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">Velvet</span>
          <span className="logo-accent">Boutique</span>
        </Link>

        <nav className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`navbar__link ${location.pathname === path ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/products" className="btn btn-primary navbar__cta">
            Shop Now
          </Link>
        </nav>

        <button
          className={`navbar__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
