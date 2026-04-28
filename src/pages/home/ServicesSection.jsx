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
              borderRadius: 4,
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid',
              borderColor: 'rgba(229, 231, 235, 0.6)',
              bgcolor: `${service.color}15`, // Increased tint opacity
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                bgcolor: service.color,
                opacity: 0,
                transition: 'opacity 0.3s ease',
              },
              '&:hover': {
                borderColor: `${service.color}40`,
                bgcolor: `${service.color}20`, // Increased hover tint
                boxShadow: `0 10px 30px -10px ${service.color}30`,
                transform: 'translateY(-4px)',
                '&::before': {
                  opacity: 1,
                }
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '16px',
                bgcolor: '#ffffff',
                boxShadow: `0 4px 12px ${service.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2.5,
                border: `1px solid ${service.color}15`,
                '& svg': { fontSize: 28, color: service.color },
              }}
            >
              {service.icon}
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', mb: 1, fontSize: '1.1rem' }}>
              {service.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3, lineHeight: 1.6 }}>
              {service.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: service.color,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                transition: 'gap 0.2s',
                '.MuiPaper-root:hover &': {
                  gap: 1.5,
                }
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
