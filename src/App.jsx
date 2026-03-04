import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919345188551?text=Hi!%20I%27m%20interested%20in%20Velvet%20Boutique%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.742 3.047 9.379L1.054 31.25l6.1-1.953A15.9 15.9 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.32 22.602c-.391 1.102-1.93 2.016-3.16 2.281-.844.18-1.946.32-5.657-1.215-4.746-1.961-7.8-6.773-8.035-7.09-.227-.316-1.898-2.527-1.898-4.82s1.2-3.422 1.625-3.89c.426-.47.93-.587 1.238-.587.309 0 .617.003.887.016.285.012.668-.108 1.043.797.391.941 1.328 3.234 1.445 3.469.117.234.196.508.04.82-.157.317-.235.512-.47.79-.234.276-.492.618-.703.828-.234.235-.477.49-.207.961.274.47 1.215 2.004 2.606 3.246 1.789 1.598 3.297 2.094 3.766 2.328.47.234.746.2 1.02-.117.273-.32 1.175-1.367 1.488-1.84.312-.468.625-.39 1.055-.234.43.16 2.723 1.285 3.191 1.52.47.234.781.351.899.546.117.196.117 1.133-.274 2.235z"/>
        </svg>
      </a>
    </Router>
  )
}

export default App
