import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import DescriptionIcon from '@mui/icons-material/Description'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const services = [
  {
    title: 'Voter Search',
    description: 'Search and find your voter registration details and election information.',
    icon: <SearchIcon />,
    path: '/voter-search',
    color: '#3b82f6',
  },
  {
    title: 'Electoral Roll',
    description: 'Electoral Roll for accessing personal election services and records.',
    icon: <DescriptionIcon />,
    path: '/elections',
    color: '#ef4444',
  },
  {
    title: 'Track Application',
    description: 'Track form progress or application status for election registrations.',
    icon: <TrackChangesIcon />,
    path: '/notifications',
    color: '#16a34a',
  },
  {
    title: 'Polling Booth',
    description: 'Find the locations of your nearest polling booths and voting centers.',
    icon: <LocationOnIcon />,
    path: '/booth-locator',
    color: '#ec4899',
  },
  {
    title: 'Complaint',
    description: 'Report an issue or complaint to election commission authorities.',
    icon: <ReportProblemIcon />,
    path: '/complaint',
    color: '#f59e0b',
  },
  {
    title: 'Voter Helpline',
    description: 'Access voter helpline services for any voting-related assistance.',
    icon: <SupportAgentIcon />,
    path: '/complaint',
    color: '#8b5cf6',
  },
]

export default function ServicesSection() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: '#1f2937', mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}
      >
        Online Services
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {services.map((service) => (
          <Paper
            key={service.title}
            component={Link}
            to={service.path}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #e5e7eb',
              bgcolor: '#fff',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: service.color,
                boxShadow: `0 4px 20px ${service.color}15`,
                transform: 'translateY(-2px)',
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                bgcolor: `${service.color}12`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                '& svg': { fontSize: 26, color: service.color },
              }}
            >
              {service.icon}
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', mb: 1, fontSize: '1.05rem' }}>
              {service.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, lineHeight: 1.5 }}>
              {service.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#16a34a',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              View More <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}
