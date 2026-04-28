import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import LoginIcon from '@mui/icons-material/Login'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import BadgeIcon from '@mui/icons-material/Badge'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import LanguageSwitcher from './LanguageSwitcher'

const citizenNavItems = [
  { label: 'Voter Search', path: '/voter-search', icon: <SearchIcon /> },
  { label: 'Services', path: '/booth-locator', icon: <MiscellaneousServicesIcon /> },
  { label: 'News', path: '/notifications', icon: <NewspaperIcon /> },
  { label: 'Contact', path: '/complaint', icon: <ContactMailIcon /> },
]

const bloNavItems = [
  { label: 'BLO Dashboard', path: '/blo-dashboard', icon: <BadgeIcon /> },
  { label: 'QR Scanner', path: '/qr-scanner', icon: <QrCodeScannerIcon /> },
  { label: 'Complaints', path: '/complaint', icon: <ContactMailIcon /> },
  { label: 'Booth Info', path: '/booth-locator', icon: <MiscellaneousServicesIcon /> },
]

function Header({ onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('authToken')
  const userRole = localStorage.getItem('userRole') || 'citizen'

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: '#ffffff',
        color: '#1f2937',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 1, sm: 2 } }}>
        {onMenuClick && (
          <IconButton
            edge="start"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            sx={{ mr: 1, display: { md: 'none' }, color: '#1f2937' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: { xs: 1, md: 0 },
            mr: { md: 4 },
          }}
        >
          <Box
            component="img"
            src="/images/logo only.jpeg"
            alt="Matdata Mitra"
            sx={{ height: 36, borderRadius: '50%' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', fontSize: '1.1rem' }}>
            Matdata Mitra
          </Typography>
        </Box>

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1 }}>
          {(userRole === 'blo' ? bloNavItems : citizenNavItems).map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#16a34a' : '#4b5563',
                fontWeight: location.pathname === item.path ? 700 : 500,
                textTransform: 'none',
                fontSize: '0.9rem',
                '&:hover': { color: '#16a34a', bgcolor: 'transparent' },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LanguageSwitcher />
          {!isLoggedIn && (
            <Button
              variant="contained"
              size="small"
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: '#16a34a',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 50,
                px: 2,
                display: { xs: 'none', sm: 'flex' },
                '&:hover': { bgcolor: '#15803d' },
              }}
            >
              Login
            </Button>
          )}
          {isLoggedIn && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                localStorage.removeItem('authToken')
                localStorage.removeItem('userRole')
                navigate('/login')
              }}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 50,
                borderColor: '#d1d5db',
                color: '#6b7280',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f9fafb',
        borderTop: '1px solid #e5e7eb',
        py: 3,
        px: 2,
        mt: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['About ECI', 'Contact Us', 'Privacy Policy', 'Terms of Use'].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{ color: '#6b7280', cursor: 'pointer', '&:hover': { color: '#16a34a' } }}
            >
              {item}
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, i) => (
            <IconButton key={i} size="small" sx={{ color: '#6b7280', '&:hover': { color: '#16a34a' } }}>
              <Icon fontSize="small" />
            </IconButton>
          ))}
        </Box>
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: '#9ca3af', fontSize: '0.8rem' }}>
        © 2026 Matdata Mitra - Election Commission of India.
      </Typography>
    </Box>
  )
}

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  
  const userRole = localStorage.getItem('userRole') || 'citizen'

  const drawer = (
    <Box sx={{ width: 280, pt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="img" src="/images/logo only.jpeg" alt="Logo" sx={{ height: 32, borderRadius: '50%' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', fontSize: '1rem' }}>
            Matdata Mitra
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ px: 1 }}>
        {(userRole === 'blo' ? bloNavItems : citizenNavItems).map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: '#4b5563',
              textDecoration: 'none',
              '&:hover': { bgcolor: '#f0fdf4', color: '#16a34a' },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ px: 2, mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={() => { handleDrawerToggle(); navigate('/login') }}
          sx={{
            bgcolor: '#16a34a',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 50,
            '&:hover': { bgcolor: '#15803d' },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      <Header onMenuClick={isMobile ? handleDrawerToggle : null} />
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: 280 } }}
        >
          {drawer}
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout