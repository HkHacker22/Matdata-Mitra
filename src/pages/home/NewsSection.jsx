import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, CircularProgress, Link } from '@mui/material'

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY
        const response = await fetch(
          `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=in&language=en,hi&category=politics&image=1&video=0`
        )
        const data = await response.json()
        if (data.status === 'success') {
          // Take the first 5 news items
          setNewsItems(data.results.slice(0, 5))
        } else {
          setError('Failed to load news')
        }
      } catch (err) {
        setError('Error fetching news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-GB', options)
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#1f2937', mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}
      >
        Latest News & Updates
      </Typography>

      <Box sx={{ bgcolor: '#fff', borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="success" />
          </Box>
        ) : error ? (
          <Box sx={{ p: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          newsItems.map((item, index) => (
            <Box key={item.article_id || index}>
              <Box
                component={Link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 4 },
                  p: { xs: 2, sm: 3 },
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  '&:hover': { bgcolor: '#f9fafb' },
                }}
              >
                {/* Image */}
                {item.image_url && (
                   <Box
                     component="img"
                     src={item.image_url}
                     alt={item.title}
                     sx={{
                       width: { xs: '100%', sm: 120 },
                       height: { xs: 180, sm: 80 },
                       objectFit: 'cover',
                       borderRadius: 2,
                       flexShrink: 0
                     }}
                   />
                )}
                
                {/* Content */}
                <Box sx={{ flex: 1 }}>
                   <Typography
                     variant="subtitle1"
                     sx={{
                       fontWeight: 700,
                       color: '#1f2937',
                       mb: 0.5,
                       fontSize: { xs: '0.9rem', sm: '1rem' },
                       display: '-webkit-box',
                       WebkitLineClamp: 2,
                       WebkitBoxOrient: 'vertical',
                       overflow: 'hidden'
                     }}
                   >
                     {item.title}
                   </Typography>
                   <Typography 
                     variant="body2" 
                     sx={{ 
                       color: '#6b7280', 
                       lineHeight: 1.5,
                       display: '-webkit-box',
                       WebkitLineClamp: 2,
                       WebkitBoxOrient: 'vertical',
                       overflow: 'hidden'
                     }}
                   >
                     {item.description || "Click to read more about this news update."}
                   </Typography>
                   <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600, mt: 1, display: 'block' }}>
                     {formatDate(item.pubDate)}
                   </Typography>
                </Box>
              </Box>
              {index < newsItems.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </Box>

      {!loading && !error && (
        <Typography
          component={Link}
          href="https://www.eci.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          sx={{
            color: '#16a34a',
            fontWeight: 600,
            mt: 2,
            display: 'inline-block',
            cursor: 'pointer',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          View All News
        </Typography>
      )}
    </Box>
  )
}
