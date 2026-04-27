import React from 'react'
const news = [
  {
    date: '27 Apr 2026',
    category: 'Election News',
    title: 'ECI Announces Schedule for State Assembly Elections 2026',
    desc: 'The Election Commission of India has released the detailed schedule for upcoming assembly elections across five states.',
    tag: 'NEW',
  },
  {
    date: '25 Apr 2026',
    category: 'Press Release',
    title: 'Voter Enrollment Drive: 1.2 Crore New Voters Added to Electoral Roll',
    desc: 'Special summary revision of electoral rolls concluded with record enrollment of first-time voters aged 18-19.',
    tag: '',
  },
  {
    date: '23 Apr 2026',
    category: 'Notice',
    title: 'Model Code of Conduct in Force in Poll-Bound States',
    desc: 'MCC comes into effect immediately upon announcement of election schedule in all five poll-bound states.',
    tag: '',
  },
  {
    date: '20 Apr 2026',
    category: 'Notification',
    title: 'SVEEP Initiative: "No Voter Left Behind" Campaign Launched Nationwide',
    desc: 'ECI launches nationwide campaign to boost voter turnout, targeting urban apathetic voters and remote constituencies.',
    tag: '',
  },
  {
    date: '18 Apr 2026',
    category: 'Order',
    title: 'Guidelines for Use of AI-Generated Content in Election Campaigns Issued',
    desc: 'Commission issues comprehensive guidelines for political parties on use of AI and deepfakes in election propaganda.',
    tag: '',
  },
]

const pressReleases = [
  { date: '26 Apr 2026', title: 'ECI Directs States to Ensure PwD-Friendly Polling Stations' },
  { date: '24 Apr 2026', title: 'Commission Reviews Preparedness with All State CEOs' },
  { date: '22 Apr 2026', title: 'Training of Polling Officers: Phase II Completed' },
  { date: '19 Apr 2026', title: 'EVM Randomization Completed for Upcoming Elections' },
]

export default function NewsSection() {
  return (
    <div style={{ background: '#F8F9FA', padding: '0 0 8px' }}>
      <div style={{
        background: '#FFFFFF', borderBottom: '3px solid #D32F2F',
        padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #E5E7EB'
      }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#D32F2F', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          📰 News / Press Releases
        </h2>
        <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
          <button style={{ color: '#D32F2F', fontWeight: 700, cursor: 'pointer', borderBottom: '2px solid #F57C00', paddingBottom: 2, background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>All News</button>
          <button style={{ color: '#6B7280', cursor: 'pointer', background: 'none', border: 'none' }}>Press Releases</button>
          <button style={{ color: '#6B7280', cursor: 'pointer', background: 'none', border: 'none' }}>Orders</button>
        </div>
      </div>

      <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 12 }}>
        {/* Main news */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
          {news.map((n, i) => (
            <div key={i} role="button" tabIndex={0} aria-label={n.title} style={{
              background: '#FFFFFF', borderBottom: i < news.length - 1 ? '1px solid #E5E7EB' : 'none', padding: '12px 16px', cursor: 'pointer',
              display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault() } }}
            >
              <div style={{ minWidth: 4, height: '100%', background: '#F57C00', borderRadius: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, background: '#F3F4F6', color: '#D32F2F', padding: '2px 6px', borderRadius: 2, fontWeight: 600, border: '1px solid #E5E7EB' }}>{n.category}</span>
                  {n.tag && <span style={{ fontSize: 10, background: '#F57C00', color: '#FFFFFF', padding: '2px 6px', borderRadius: 2, fontWeight: 700 }}>{n.tag}</span>}
                  <span style={{ fontSize: 10, color: '#6B7280', marginLeft: 'auto' }}>{n.date}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 4, lineHeight: 1.3 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.4 }}>{n.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ padding: '10px 16px', background: '#F8F9FA', textAlign: 'center', borderTop: '1px solid #E5E7EB' }}>
            <button style={{ fontSize: 12, color: '#D32F2F', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none' }}>View All News & Press Releases →</button>
          </div>
        </div>

        {/* Press releases sidebar */}
        <div>
          <div style={{ background: '#FFFFFF', borderRadius: 4, overflow: 'hidden', border: '1px solid #E5E7EB' }}>
            <div style={{ background: '#F8F9FA', color: '#D32F2F', padding: '10px 14px', fontSize: 13, fontWeight: 700, borderBottom: '1px solid #E5E7EB' }}>
              📋 Quick Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {pressReleases.map((p, i) => (
                <div key={i} role="button" tabIndex={0} aria-label={p.title} style={{ padding: '10px 14px', borderBottom: i < pressReleases.length - 1 ? '1px solid #E5E7EB' : 'none', cursor: 'pointer', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                  onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault() } }}
                >
                  <div style={{ fontSize: 10, color: '#F57C00', fontWeight: 700, marginBottom: 2 }}>{p.date}</div>
                  <div style={{ fontSize: 12, color: '#1F2937', lineHeight: 1.3 }}>{p.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert box */}
          <div style={{ marginTop: 10, background: '#FFFFFF', border: '1px solid #F57C00', borderRadius: 4, padding: '12px 14px', borderLeft: '4px solid #F57C00' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#1F2937', marginBottom: 6 }}>⚠️ Important Notice</div>
            <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.4 }}>
              Bring Voter ID (EPIC) to polling station. Voting hours: <strong>7:00 AM – 6:00 PM</strong>. Helpline: <strong style={{ color: '#D32F2F' }}>1950</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
