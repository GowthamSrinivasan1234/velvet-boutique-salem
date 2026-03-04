import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100Z" fill="var(--velvet)" />
        </svg>
      </div>

      <div className="footer__body">
        <div className="container footer__grid">
          <div className="footer__brand">
            <h3 className="footer__logo">
              <img src="/images/logo-horizontal-white.png" alt="Velvet Boutique" className="footer__logo-img" />
            </h3>
            <p>Curated sarees, kurtis & custom designs for the bold & beautiful. Your women-owned boutique in Salem, Tamil Nadu.</p>
            <div className="footer__socials">
              <a href="https://www.instagram.com/velvet_boutique_salem/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">I</a>
              <a href="https://www.google.com/maps/place/Velvet+Boutique/@11.6761752,78.1437772,924m" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Google Maps">G</a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Collections</Link>
            <Link to="/about">About Us</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <h4>Customer Care</h4>
            <a href="#">Shipping & Returns</a>
            <a href="#">Size Guide</a>
            <a href="#">FAQs</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          <div className="footer__col">
            <h4>Get in Touch</h4>
            <p>Indira Gandhi Rd, Fairlands<br/>Salem, Tamil Nadu 636016</p>
            <p>hello@velvetboutique.com</p>
            <p>+91 93451 88551</p>
          </div>
        </div>

        <div className="container footer__bottom">
          <p>&copy; {new Date().getFullYear()} Velvet Boutique. All rights reserved.</p>
          <p>Crafted with ♥ for fashion lovers</p>
        </div>
      </div>
    </footer>
  )
}
