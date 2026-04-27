import { Link } from 'react-router-dom'

const services = [
  { icon: '🔍', title: 'Voter Search', desc: 'Find voter details by name, EPIC or address', path: '/voter-search' },
  { icon: '📷', title: 'QR Scanner', desc: 'Scan voter slip QR code to verify identity', path: '/qr-scanner' },
  { icon: '🎫', title: 'QR Generator', desc: 'Generate QR code for your voter slip', path: '/qr-generator' },
  { icon: '📍', title: 'Booth Locator', desc: 'Find nearest polling booth with directions', path: '/booth-locator' },
  { icon: '📝', title: 'File Complaint', desc: 'Report election-related issues', path: '/complaint' },
  { icon: '📊', title: 'BLO Dashboard', desc: 'Booth Level Officer management portal', path: '/blo-dashboard' },
  { icon: '🗓', title: 'Election Schedule', desc: 'View upcoming election dates and phases', path: '/voter-search' },
  { icon: '📋', title: 'Apply for EPIC', desc: 'Apply for new Voter ID card online', path: '/voter-search' },
  { icon: '✏️', title: 'Correction in Roll', desc: 'Update your details in voter list', path: '/voter-search' },
  { icon: '🔀', title: 'Transfer of Entry', desc: 'Transfer voter entry to new constituency', path: '/voter-search' },
  { icon: '🏛', title: 'Constituency Info', desc: 'Know your constituency and representative', path: '/booth-locator' },
  { icon: '📞', title: 'Voter Helpline', desc: 'Call 1950 for election assistance', path: '/complaint' },
]

const extLinks = [
  { icon: '🌐', label: 'CEO Portal', sub: 'Chief Electoral Officer' },
  { icon: '📱', label: 'Voter Helpline App', sub: 'Download on Mobile' },
  { icon: '🏛', label: 'NVP Portal', sub: 'National Voters Portal' },
  { icon: '🗳', label: 'EVM Info', sub: 'Electronic Voting Machine' },
]

export default function ServicesSection() {
  return (
    <div style={{ background: '#F8F9FA', padding: '0 0 8px' }}>
      {/* Section header */}
      <div style={{
        background: '#FFFFFF', borderBottom: '3px solid #F57C00',
        padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #E5E7EB'
      }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#D32F2F', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          🏛 Online Services
        </h2>
        <button aria-label="View all online services" style={{ fontSize: 12, color: '#F57C00', cursor: 'pointer', fontWeight: 600, background: 'none', border: 'none', padding: 0 }}>View All ›</button>
      </div>

      {/* Services grid */}
      <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {services.map((s, i) => (
          <Link key={i} to={s.path} aria-label={s.title} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#FFFFFF', borderRadius: 6, padding: '14px 10px', textAlign: 'center',
              border: '1px solid #E5E7EB', cursor: 'pointer', transition: 'transform 0.15s, border-color 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#D32F2F' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E5E7EB' }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937', marginBottom: 3, lineHeight: 1.2 }}>{s.title}</div>
              <div style={{ fontSize: 10, color: '#6B7280', lineHeight: 1.3 }}>{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* External portal strip */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 6, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', padding: '12px 0' }}>
          {extLinks.map((e, i) => (
            <div key={i} role="button" tabIndex={0} aria-label={e.label} style={{ borderRight: i < 3 ? '1px solid #E5E7EB' : 'none', cursor: 'pointer', padding: '4px 0' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{e.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#D32F2F' }}>{e.label}</div>
              <div style={{ fontSize: 10, color: '#6B7280' }}>{e.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
