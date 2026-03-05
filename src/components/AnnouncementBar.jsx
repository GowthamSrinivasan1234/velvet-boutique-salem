import { useState, useEffect } from 'react'
import './AnnouncementBar.css'

// ═══════════════════════════════════════════════════════════════════════════════
// ANNOUNCEMENT CONFIGURATION - Edit this to change the announcement!
// ═══════════════════════════════════════════════════════════════════════════════
const ANNOUNCEMENTS = {
  // Set to true to enable, false to disable
  enabled: true,
  
  // Main announcement bar message
  message: "🌸 Happy Women's Day! Here's to strong women — may we know them, be them, raise them ✨",
  
  // Link (optional) - set to null if no link needed
  link: null,
  linkText: '',
  
  // Special day background overlay for hero (shows behind hero content)
  specialDay: {
    enabled: false,
    title: "Happy Women's Day",
    subtitle: "Celebrating the strength & grace of every woman",
    discount: "",
  },
  
  // Background image for hero section (from Unsplash)
  heroBackground: '',
}

// Export for use in other components
export const getAnnouncementConfig = () => ANNOUNCEMENTS

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user already dismissed today
    const dismissedDate = localStorage.getItem('announcementDismissed')
    const today = new Date().toDateString()
    if (dismissedDate === today) {
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    localStorage.setItem('announcementDismissed', new Date().toDateString())
  }

  if (!ANNOUNCEMENTS.enabled || dismissed || !visible) return null

  return (
    <div className="announcement-bar">
      <div className="announcement-bar__content">
        <span className="announcement-bar__message">{ANNOUNCEMENTS.message}</span>
        {ANNOUNCEMENTS.link && (
          <a href={ANNOUNCEMENTS.link} className="announcement-bar__link">
            {ANNOUNCEMENTS.linkText} →
          </a>
        )}
      </div>
      <button 
        className="announcement-bar__close" 
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
      >
        ✕
      </button>
    </div>
  )
}
