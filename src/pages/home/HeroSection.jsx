import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tricolorStripe = {
  background: 'linear-gradient(to right, #F57C00 33.33%, #ffffff 33.33%, #ffffff 66.66%, #2E7D32 66.66%)',
  height: '5px',
  width: '100%',
}

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/voter-search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div style={{ background: '#D32F2F', color: '#FFFFFF', padding: '0 0 0 0' }}>
      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .ticker-content {
            display: inline-block;
            white-space: nowrap;
            padding-left: 100%;
            animation: ticker 25s linear infinite;
          }
          .ticker-content:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      {/* Tricolor top stripe */}
      <div style={tricolorStripe} />

      {/* Header emblem row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 900, color: '#D32F2F', border: '2px solid #E5E7EB'
          }}>🗳</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1, fontFamily: 'Georgia, serif' }}>Matdata Mitra</div>
            <div style={{ fontSize: 10, opacity: 0.8, letterSpacing: 2, textTransform: 'uppercase' }}>Election Commission of India</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, opacity: 0.9 }}>
          <span>हिन्दी</span>
          <span>|</span>
          <span>English</span>
          <span style={{ marginLeft: 12, background: '#F57C00', color: '#FFFFFF', padding: '3px 10px', borderRadius: 3, fontWeight: 700, fontSize: 11 }}>
            🔔 Notifications
          </span>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ background: '#F8F9FA', color: '#1F2937', padding: '5px 24px', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <span style={{ background: '#D32F2F', color: '#FFFFFF', padding: '2px 8px', borderRadius: 2, fontSize: 11, whiteSpace: 'nowrap', zIndex: 1 }}>LATEST</span>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div className="ticker-content" style={{ color: '#6B7280', fontWeight: 500 }}>
            Assembly Elections 2024 scheduled | Last date for voter registration: May 15 | Electoral rolls updated | Check your name in voter list | Report issues at our helpline 1950
          </div>
        </div>
      </div>

      {/* Hero search */}
      <div style={{ padding: '36px 24px 40px', textAlign: 'center', background: '#F8F9FA', color: '#1F2937', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ fontSize: 13, color: '#6B7280', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>भारत निर्वाचन आयोग</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, margin: '0 0 4px', fontFamily: 'Georgia, serif', letterSpacing: -0.5, color: '#D32F2F' }}>
          मतदान मित्र
        </h1>
        <div style={{ fontSize: 15, color: '#6B7280', marginBottom: 28 }}>Your Complete Election Services Portal</div>
        <form onSubmit={handleSearch} style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden', border: '1px solid #E5E7EB' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, EPIC number, or address..."
            aria-label="Search by name, EPIC number, or address"
            style={{
              flex: 1, padding: '14px 20px', fontSize: 14, border: 'none', outline: 'none',
              color: '#1F2937', background: '#FFFFFF'
            }}
          />
          <button type="submit" aria-label="Submit search query" style={{
            background: '#F57C00', color: '#FFFFFF', border: 'none', padding: '14px 24px',
            fontWeight: 700, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            🔍 Search
          </button>
        </form>
        <div style={{ marginTop: 14, fontSize: 11, color: '#6B7280', display: 'flex', justifyContent: 'center', gap: 20 }}>
          <span>Search by: Name</span><span>|</span><span>EPIC Number</span><span>|</span><span>Mobile</span><span>|</span><span>Address</span>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        background: '#FFFFFF', borderBottom: '1px solid #E5E7EB',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', padding: '14px 24px', gap: 0
      }}>
        {[
          { num: '94.5 Cr', label: 'Registered Voters' },
          { num: '10.5 Lakh', label: 'Polling Stations' },
          { num: '543', label: 'Lok Sabha Seats' },
          { num: '4031', label: 'Assembly Seats' },
        ].map((s, i) => (
          <div key={i} style={{ borderRight: i < 3 ? '1px solid #E5E7EB' : 'none', padding: '6px 0' }}>
            <div style={{ fontSize: 'clamp(1rem, 3vw, 1.6rem)', fontWeight: 900, color: '#D32F2F', lineHeight: 1.1 }}>{s.num}</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
