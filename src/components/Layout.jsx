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
  { label: 'Notifications', path: '/notifications', icon: <NewspaperIcon /> },
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
      elevation={0}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: '#1f2937',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
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
            gap: 1.5,
            textDecoration: 'none',
            color: 'inherit',
            flexShrink: 0,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.03)',
              filter: 'drop-shadow(0px 4px 8px rgba(22, 163, 74, 0.15))',
            },
          }}
        >
          <Box
            component="img"
            src="/images/logo only.jpeg"
            alt="Matdata Mitra"
            sx={{ height: 40, borderRadius: '50%', border: '2px solid rgba(22, 163, 74, 0.1)' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            Matdata Mitra
          </Typography>
        </Box>

        {/* Desktop Nav - Centered */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1, flexGrow: 1 }}>
          {(userRole === 'blo' ? bloNavItems : citizenNavItems).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={React.cloneElement(item.icon, { sx: { fontSize: 18 } })}
                sx={{
                  color: isActive ? '#16a34a' : '#4b5563',
                  fontWeight: isActive ? 700 : 500,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  py: 1,
                  px: 2,
                  borderRadius: 3,
                  bgcolor: isActive ? 'rgba(22, 163, 74, 0.08)' : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    color: '#16a34a', 
                    bgcolor: 'rgba(22, 163, 74, 0.04)',
                    transform: 'translateY(-1px)'
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* Right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
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
                px: 2.5,
                py: 0.75,
                boxShadow: '0 4px 14px 0 rgba(22, 163, 74, 0.39)',
                display: { xs: 'none', sm: 'flex' },
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { 
                  bgcolor: '#15803d',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(22, 163, 74, 0.4)'
                },
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
                px: 2.5,
                py: 0.75,
                display: { xs: 'none', sm: 'flex' },
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#ef4444',
                  color: '#ef4444',
                  bgcolor: 'rgba(239, 68, 68, 0.04)'
                }
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
        bgcolor: '#ffffff',
        borderTop: '1px solid rgba(229, 231, 235, 0.5)',
        py: 4,
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
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['About ECI', 'Contact Us', 'Privacy Policy', 'Terms of Use'].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{ 
                color: '#4b5563', 
                fontWeight: 500,
                cursor: 'pointer', 
                transition: 'color 0.2s',
                '&:hover': { color: '#16a34a' } 
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, i) => (
            <IconButton 
              key={i} 
              size="small" 
              sx={{ 
                color: '#9ca3af', 
                bgcolor: '#f3f4f6',
                transition: 'all 0.2s',
                '&:hover': { color: '#ffffff', bgcolor: '#16a34a', transform: 'translateY(-2px)' } 
              }}
            >
              <Icon fontSize="small" />
            </IconButton>
          ))}
        </Box>
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: '#9ca3af', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} Matdata Mitra - Election Commission of India.
      </Typography>
    </Box>
  )
}

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  
  const userRole = localStorage.getItem('userRole') || 'citizen'
  const isHome = location.pathname === '/'

  const drawer = (
    <Box sx={{ width: 280, pt: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 2, borderBottom: '1px solid #f3f4f6' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box component="img" src="/images/logo only.jpeg" alt="Logo" sx={{ height: 36, borderRadius: '50%' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', fontSize: '1.1rem' }}>
            Matdata Mitra
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ bgcolor: '#f3f4f6' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {(userRole === 'blo' ? bloNavItems : citizenNavItems).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 3,
                mb: 1,
                py: 1.5,
                color: isActive ? '#16a34a' : '#4b5563',
                bgcolor: isActive ? 'rgba(22, 163, 74, 0.08)' : 'transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: 'rgba(22, 163, 74, 0.04)', color: '#16a34a' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 'inherit' }} />
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ px: 2, pb: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={() => { handleDrawerToggle(); navigate('/login') }}
          sx={{
            bgcolor: '#1f2937',
            textTransform: 'none',
            fontWeight: 600,
            py: 1.5,
            borderRadius: 3,
            '&:hover': { bgcolor: '#111827' },
          }}
        >
          Login to Portal
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
          sx={{ '& .MuiDrawer-paper': { width: 280, borderRight: 'none', boxShadow: '4px 0 24px rgba(0,0,0,0.05)' } }}
        >
          {drawer}
        </Drawer>
      )}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          px: isHome ? 0 : { xs: 2, sm: 4, md: 6 },
          py: isHome ? 0 : { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: isHome ? '100%' : 1200, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout