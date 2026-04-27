import React from 'react'
import { Link } from 'react-router-dom'

const col1 = [
  { label: 'Category' },
  { label: 'Voter Services', path: '/voter-search' },
  { label: 'My Government', path: '/' },
  { label: 'Contact ECI', path: '/complaint' },
  { label: 'Explore India', path: '/' },
  { label: 'Archive', path: '/' },
  { label: 'About ECI', path: '/' },
  { label: 'Site Map', path: '/' },
]
const col2 = [
  { label: 'Spotlight' },
  { label: 'SVEEP Campaign', path: '/' },
  { label: 'Voter Helpline 1950', path: '/' },
  { label: 'cVIGIL App', path: '/' },
  { label: 'Voter Turnout App', path: '/' },
  { label: 'Know Your Candidate', path: '/' },
  { label: 'Electoral Bonds Info', path: '/' },
]
const col3 = [
  { label: 'Services' },
  { label: 'Voter Registration', path: '/voter-search' },
  { label: 'EPIC Download', path: '/voter-search' },
  { label: 'Polling Booth Locator', path: '/booth-locator' },
  { label: 'File Complaint', path: '/complaint' },
  { label: 'QR Scanner', path: '/qr-scanner' },
  { label: 'BLO Dashboard', path: '/blo-dashboard' },
]
const col4 = [
  { label: 'Media' },
  { label: 'Press Releases', path: '/' },
  { label: 'Photo Gallery', path: '/' },
  { label: 'Video Gallery', path: '/' },
  { label: 'Subscribe to News', path: '/' },
  { label: 'Content Archive', path: '/' },
  { label: 'RTI', path: '/' },
]

const govLogos = ['CPGRAMS', 'data.gov.in', 'UMANG', 'Digi Locker', 'MyGov', 'NIC']
const socials = ['Facebook', 'Twitter/X', 'YouTube', 'Instagram', 'Telegram', 'Koo']

export default function MegaFooter() {
  return (
    <footer style={{ background: '#212121', color: '#E5E7EB', fontFamily: 'system-ui, sans-serif' }}>
      {/* Gov logos strip */}
      <div style={{ background: 'rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '12px 24px' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', overflowX: 'auto', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#9CA3AF', whiteSpace: 'nowrap', marginRight: 8, fontWeight: 600 }}>GOV PORTALS:</span>
          {govLogos.map((g, i) => (
            <div key={i} role="button" tabIndex={0} aria-label={g} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              padding: '5px 14px', borderRadius: 3, fontSize: 11, color: '#D1D5DB', cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'background 0.15s'
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,124,0,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault() } }}
            >{g}</div>
          ))}
        </div>
      </div>

      {/* 4-column footer links */}
      <div style={{ padding: '28px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
        {[col1, col2, col3, col4].map((col, ci) => (
          <div key={ci}>
            {col.map((item, ii) => (
              <div key={ii}>
                {ii === 0
                  ? <div style={{ fontSize: 12, fontWeight: 800, color: '#F57C00', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid rgba(245,124,0,0.3)' }}>{item.label}</div>
                  : <Link to={item.path || '/'} aria-label={item.label} style={{ display: 'block', fontSize: 12, color: '#D1D5DB', marginBottom: 7, textDecoration: 'none', lineHeight: 1.4, transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
                  >{item.label}</Link>
                }
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Social + Follow */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '16px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600 }}>Follow Us:</span>
            {socials.map((s, i) => (
              <span key={i} role="button" tabIndex={0} aria-label={`Follow on ${s}`} style={{
                fontSize: 11, background: 'rgba(255,255,255,0.05)', color: '#D1D5DB',
                padding: '3px 10px', borderRadius: 3, cursor: 'pointer', transition: 'background 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,124,0,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault() } }}
              >{s}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#9CA3AF' }}>
            <span>Accessibility</span>
            <span>|</span>
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Terms of Use</span>
            <span>|</span>
            <span>Feedback</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 11, color: '#9CA3AF' }}>
          © 2026 Matdata Mitra · Election Commission of India · Developed by NIC
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>Last Updated: 27 Apr 2026</span>
          <span style={{ fontSize: 10, background: '#2E7D32', color: '#FFFFFF', padding: '2px 8px', borderRadius: 2, fontWeight: 700 }}>LIVE</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 10, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
          Translation of the content into other languages other than English are provided as a matter of convenience and for informational purpose only.
          In all matters of interpretation of information, views, the English version will be considered final.
          The website is designed, developed and maintained by NIC, Government of India.
        </p>
      </div>
    </footer>
  )
}
