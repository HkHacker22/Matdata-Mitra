import React from 'react'
import { Box, Typography, Divider } from '@mui/material'

const newsItems = [
  {
    date: '27 Apr 2026',
    title: 'ECI Announces Schedule for State Assembly Elections...',
    description: 'ECI Announces Schedule for State Assembly Elections, short insuraments and/ors for State Assembly Elections in four States...',
  },
  {
    date: '25 Apr 2026',
    title: 'Voter Enrollment Drive: 1.2 Crore New Voters...',
    description: 'Voter Enrollment Drive: 1.2 Crore New Voters, se-tarsos that\'s meturified by Commission Board esam and/w vote organizes...',
  },
  {
    date: '20 Apr 2026',
    title: 'SVEEP Initiative: "No Voter Left Behind" Campaign...',
    description: 'SVEEP Initiative "No Voter Left Behind" Campaign, senovanise voter intilimet in the mroarit of used and services...',
  },
]

export default function NewsSection() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#1f2937', mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}
      >
        Latest News & Updates
      </Typography>

      <Box sx={{ bgcolor: '#fff', borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {newsItems.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, sm: 4 },
                p: { xs: 2, sm: 3 },
                cursor: 'pointer',
                transition: 'background 0.15s',
                '&:hover': { bgcolor: '#f9fafb' },
              }}
            >
              {/* Date */}
              <Typography
                variant="body2"
                sx={{
                  color: '#16a34a',
                  fontWeight: 600,
                  minWidth: { xs: 70, sm: 100 },
                  flexShrink: 0,
                  fontSize: '0.85rem',
                }}
              >
                {item.date}
              </Typography>

              {/* Content */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: '#1f2937',
                    mb: 0.5,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.5 }}>
                  {item.description}
                </Typography>
                <Typography variant="caption" sx={{ color: '#9ca3af', mt: 0.5, display: 'block' }}>
                  {item.date}
                </Typography>
              </Box>
            </Box>
            {index < newsItems.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: '#16a34a',
          fontWeight: 600,
          mt: 2,
          cursor: 'pointer',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        View All News
      </Typography>
    </Box>
  )
}
