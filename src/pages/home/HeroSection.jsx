import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: 0, sm: 3 },
        mx: { xs: 0, sm: 2 },
        mt: { xs: 0, sm: 2 },
      }}
    >
      {/* Background image with overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(220,252,231,0.92) 0%, rgba(224,242,254,0.88) 50%, rgba(220,252,231,0.85) 100%)',
          },
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 7 },
          gap: 4,
        }}
      >
        {/* Text Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#1f2937',
              lineHeight: 1.2,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Empowering Every Vote,{' '}
            <Box component="span" sx={{ display: 'block' }}>
              Strengthen Democracy
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#4b5563', mb: 3, fontSize: '1.05rem', maxWidth: 420 }}
          >
            Your one-stop portal for all election services and information.
          </Typography>
          <Button
            component={Link}
            to="/voter-search"
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#16a34a',
              color: '#fff',
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: 50,
              px: 4,
              py: 1.2,
              fontSize: '1rem',
              '&:hover': { bgcolor: '#15803d' },
            }}
          >
            Register to Vote
          </Button>
        </Box>

        {/* Hero Image */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src="/images/1.webp"
            alt="Indian Democracy"
            sx={{
              maxWidth: { xs: '100%', md: 380 },
              borderRadius: 3,
              boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
