import { Link } from 'react-router-dom'

const schemes = [
  { icon: '🆔', title: 'Voter ID Card (EPIC)', desc: 'Apply online for new EPIC card or correction', badge: 'Apply Now' },
  { icon: '📲', title: 'Voter Helpline 1950', desc: 'Get instant assistance on election queries', badge: 'Call Now' },
  { icon: '🏘', title: 'SVEEP Programme', desc: 'Systematic Voters Education & Electoral Participation', badge: 'Know More' },
  { icon: '♿', title: 'PwD Voter Services', desc: 'Special facilities for differently-abled voters', badge: 'Apply' },
  { icon: '🌍', title: 'NRI Voter Registration', desc: 'Register as overseas Indian voter', badge: 'Register' },
  { icon: '👮', title: 'Service Voters', desc: 'Special provisions for armed forces voters', badge: 'Apply' },
]

const featured = [
  {
    bg: '#FFFFFF',
    borderTop: '#1A237E',
    icon: '📊',
    title: 'BLO Dashboard',
    desc: 'Booth Level Officer portal for managing voter lists, field verification and reports',
    path: '/blo-dashboard',
    badge: 'Officer Login',
  },
  {
    bg: '#FFFFFF',
    borderTop: '#2E7D32',
    icon: '📍',
    title: 'Polling Booth Locator',
    desc: 'Find your assigned polling booth with map, address, and directions',
    path: '/booth-locator',
    badge: 'Find My Booth',
  },
  {
    bg: '#FFFFFF',
    borderTop: '#F57C00',
    icon: '⚠️',
    title: 'Complaint Portal',
    desc: 'File complaints about election violations, MCC breach, or booth irregularities',
    path: '/complaint',
    badge: 'File Complaint',
  },
]

const directories = [
  { icon: '🗺', title: 'CEO Directory', sub: 'Chief Electoral Officers' },
  { icon: '🏛', title: 'DEO Directory', sub: 'District Electoral Officers' },
  { icon: '📋', title: 'ERO Directory', sub: 'Electoral Registration Officers' },
  { icon: '📞', title: 'Contact ECI', sub: 'Nirvachan Sadan, New Delhi' },
]

const elections = [
  { icon: '🗳', label: 'Lok Sabha 2024', sub: 'General Election Results', color: '#1A237E' },
  { icon: '🏛', label: 'State Elections', sub: 'All State Assembly Results', color: '#1A237E' },
  { icon: '📅', label: 'Election Schedule', sub: 'Upcoming phases and dates', color: '#1A237E' },
  { icon: '🗺', label: 'Constituency Map', sub: 'Interactive Delimitation Map', color: '#1A237E' },
]

export default function LowerSections() {
  return (
    <div style={{ background: '#F8F9FA' }}>

      {/* Government Schemes */}
      <div style={{ background: '#F8F9FA', padding: '0 0 8px' }}>
        <div style={{
          background: '#FFFFFF', borderBottom: '3px solid #2E7D32',
          padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid #E5E7EB'
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1A237E', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            🏛 Election Services & Schemes
          </h2>
          <span style={{ fontSize: 12, color: '#2E7D32', cursor: 'pointer', fontWeight: 600 }}>View All ›</span>
        </div>
        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {schemes.map((s, i) => (
            <div key={i} style={{
              background: '#FFFFFF', borderRadius: 6, padding: '14px 16px', cursor: 'pointer',
              border: '1px solid #E5E7EB', display: 'flex', gap: 12, alignItems: 'flex-start',
              transition: 'transform 0.15s, border-color 0.15s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#1A237E' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#E5E7EB' }}
            >
              <div style={{ fontSize: 26 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1F2937', marginBottom: 3 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.3, marginBottom: 6 }}>{s.desc}</div>
                <span style={{ fontSize: 10, background: '#F8F9FA', color: '#1A237E', padding: '2px 8px', borderRadius: 10, fontWeight: 700, border: '1px solid #E5E7EB' }}>{s.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured service cards */}
      <div style={{ padding: '8px 16px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {featured.map((f, i) => (
            <Link key={i} to={f.path} style={{ textDecoration: 'none' }}>
              <div style={{
                background: f.bg, color: '#1F2937', borderRadius: 6, padding: '20px 20px',
                border: '1px solid #E5E7EB', borderTop: `3px solid ${f.borderTop}`,
                cursor: 'pointer', minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6, color: '#1F2937' }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.4 }}>{f.desc}</div>
                </div>
                <div style={{ marginTop: 14, display: 'inline-block', background: '#F8F9FA', color: '#1A237E', padding: '4px 12px', borderRadius: 12, fontSize: 11, fontWeight: 700, width: 'fit-content', border: '1px solid #E5E7EB' }}>
                  {f.badge} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Spotlight Banner */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{
          background: '#FFFFFF',
          borderLeft: '4px solid #F57C00',
          border: '1px solid #E5E7EB', borderLeftWidth: 4, borderLeftColor: '#F57C00',
          borderRadius: 6, padding: '20px 24px', color: '#1F2937',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6B7280', marginBottom: 4, fontWeight: 600 }}>🔦 Spotlight Campaign</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 6, fontFamily: 'Georgia, serif', color: '#1A237E' }}>मेरा पहला वोट देश के लिए</div>
            <div style={{ fontSize: 13, color: '#6B7280' }}>Encouraging first-time voters aged 18-19 to participate in democracy. Register today.</div>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0, marginLeft: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 4 }}>🗳️</div>
            <div style={{ background: '#F57C00', color: '#FFFFFF', padding: '8px 20px', borderRadius: 4, fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Register Now
            </div>
          </div>
        </div>
      </div>

      {/* Government Directories */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{
          background: '#FFFFFF', borderBottom: '3px solid #1A237E',
          padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderRadius: '4px 4px 0 0', borderTop: '1px solid #E5E7EB', borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB'
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: '#1A237E', margin: 0, textTransform: 'uppercase' }}>
            📁 Government Directories
          </h2>
        </div>
        <div style={{ background: '#FFFFFF', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', borderRadius: '0 0 4px 4px' }}>
          {directories.map((d, i) => (
            <div key={i} style={{
              padding: '16px', textAlign: 'center', cursor: 'pointer',
              borderRight: i < 3 ? '1px solid #E5E7EB' : 'none',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{d.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1A237E', marginBottom: 2 }}>{d.title}</div>
              <div style={{ fontSize: 10, color: '#6B7280' }}>{d.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Elections */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{
          background: '#FFFFFF', borderBottom: '3px solid #F57C00',
          padding: '10px 16px', borderRadius: '4px 4px 0 0',
          borderTop: '1px solid #E5E7EB', borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB'
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: '#1A237E', margin: 0, textTransform: 'uppercase' }}>
            🗺 Explore Elections
          </h2>
        </div>
        <div style={{ background: '#FFFFFF', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', borderRadius: '0 0 4px 4px' }}>
          {elections.map((e, i) => (
            <div key={i} style={{
              padding: '14px 16px', textAlign: 'center', cursor: 'pointer',
              borderRight: i < 3 ? '1px solid #E5E7EB' : 'none', borderTop: i > 3 ? '1px solid #E5E7EB' : 'none',
            }}
              onMouseEnter={e2 => e2.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={e2 => e2.currentTarget.style.background = '#FFFFFF'}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{e.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: e.color, marginBottom: 2 }}>{e.label}</div>
              <div style={{ fontSize: 10, color: '#6B7280' }}>{e.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MyGov / Citizen Engagement */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: '#FFFFFF', border: '1px solid #E5E7EB',
          borderRadius: 6, padding: '18px 20px', color: '#1F2937',
        }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4, color: '#1A237E' }}>🤝 Citizen Engagement — MyGov Connect</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>Participate in nation-building activities. Share your views on elections and governance.</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Take a Quiz', 'Give Feedback', 'Join Discussion', 'Report Issues'].map((btn, i) => (
              <div key={i} style={{
                background: '#FFFFFF', border: '1px solid #E5E7EB',
                color: '#1A237E', padding: '6px 16px', borderRadius: 3, fontSize: 12, fontWeight: 600, cursor: 'pointer'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F8F9FA'; e.currentTarget.style.borderColor = '#1A237E' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB' }}
              >{btn}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
