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
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
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
import UploadFileIcon from '@mui/icons-material/UploadFile'
import PersonIcon from '@mui/icons-material/Person'
import LanguageSwitcher from './LanguageSwitcher'
import CampaignIcon from '@mui/icons-material/Campaign'
import { apiClient } from '../api/client'

const citizenNavItems = [
  { label: 'Voter Search', path: '/voter-search', icon: <SearchIcon /> },
  { label: 'Services', path: '/booth-locator', icon: <MiscellaneousServicesIcon /> },
  { label: 'Notifications', path: '/notifications', icon: <NewspaperIcon /> },
  { label: 'Contact', path: '/complaint', icon: <ContactMailIcon /> },
  { label: 'Report', path: 'https://urbaneye-iii.vercel.app/login', icon: <CampaignIcon />, external: true },
]

const bloNavItems = [
  { label: 'BLO Dashboard', path: '/blo-dashboard', icon: <BadgeIcon /> },
  { label: 'QR Scanner', path: '/qr-scanner', icon: <QrCodeScannerIcon /> },
  { label: 'Complaints', path: '/complaint', icon: <ContactMailIcon /> },
  { label: 'Booth Info', path: '/booth-locator', icon: <MiscellaneousServicesIcon /> },
  { label: 'Report', path: 'https://urbaneye-iii.vercel.app/login', icon: <CampaignIcon />, external: true },
]

function Header({ onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('authToken')
  const userRole = localStorage.getItem('userRole') || 'citizen'

  const [anchorEl, setAnchorEl] = useState(null)
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget)
  const handleProfileClose = () => setAnchorEl(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      alert(`Simulating document upload for: ${file.name}`)
      // Add real upload logic here later
    }
    handleProfileClose()
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(240, 248, 255, 0.85)',
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
                component={item.external ? 'a' : Link}
                {...(item.external ? { href: item.path, target: '_blank', rel: 'noopener noreferrer' } : { to: item.path })}
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
            <>
              <IconButton 
                onClick={handleProfileClick} 
                size="small"
                sx={{ 
                  bgcolor: 'rgba(59, 130, 246, 0.1)', 
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.2)', transform: 'translateY(-2px)' } 
                }}
              >
                <PersonIcon sx={{ color: '#3b82f6' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: { mt: 1.5, minWidth: 240, borderRadius: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(229,231,235,0.5)' }
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1f2937' }}>
                    User Profile
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#3b82f6', fontWeight: 600, mb: 0.5, wordBreak: 'break-all' }}>
                    {localStorage.getItem('userEmail') || localStorage.getItem('userPhone') || 'user@example.com'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500, bgcolor: '#f1f5f9', px: 1, py: 0.25, borderRadius: 1 }}>
                    Role: {userRole.toUpperCase()}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 1, mx: 2 }} />
                {userRole === 'citizen' && localStorage.getItem('userEpicId') && (
                  <MenuItem 
                    component={Link} 
                    to={`/qr-generator?voterId=${localStorage.getItem('userEpicId')}`}
                    onClick={handleProfileClose}
                    sx={{ py: 1.5, px: 2, mx: 1, borderRadius: 2, mb: 1, '&:hover': { bgcolor: 'rgba(22, 163, 74, 0.05)' } }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <QrCodeScannerIcon fontSize="small" sx={{ color: '#16a34a' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Generate My QR" 
                      secondary="Digital Voter Slip" 
                      primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600, color: '#1f2937' }} 
                      secondaryTypographyProps={{ fontSize: '0.75rem' }} 
                    />
                  </MenuItem>
                )}
                <MenuItem component="label" sx={{ py: 1.5, px: 2, mx: 1, borderRadius: 2, mb: 1, '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.05)' } }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <UploadFileIcon fontSize="small" sx={{ color: '#3b82f6' }} />
                  </ListItemIcon>
                  <ListItemText primary="Upload Document" secondary="PDF format only" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600, color: '#1f2937' }} secondaryTypographyProps={{ fontSize: '0.75rem' }} />
                  <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
                </MenuItem>
              </Menu>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  localStorage.removeItem('authToken')
                  localStorage.removeItem('userRole')
                  localStorage.removeItem('userEpicId')
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const footerLinks = [
  { label: 'About ECI', url: 'https://www.eci.gov.in/about-eci' },
  { label: 'Contact Us', url: 'https://www.eci.gov.in/contact-us' },
  { label: 'Privacy Policy', url: 'https://www.eci.gov.in/privacy-policy' },
  { label: 'Terms of Use', url: 'https://www.eci.gov.in/terms-conditions' }
];

const socialLinks = [
  { icon: FacebookIcon, url: 'https://www.facebook.com/ECI/' },
  { icon: TwitterIcon, url: 'https://twitter.com/ECISVEEP' },
  { icon: InstagramIcon, url: 'https://www.instagram.com/ecisveep/' },
  { icon: LinkedInIcon, url: 'https://www.linkedin.com/company/election-commission-of-india' }
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f0f8ff', // subtle blue tint
        borderTop: '1px solid rgba(59, 130, 246, 0.15)', // subtle blue border
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
          {footerLinks.map((item) => (
            <Typography
              key={item.label}
              component="a"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              sx={{ 
                color: '#475569', 
                fontWeight: 600,
                cursor: 'pointer', 
                textDecoration: 'none',
                transition: 'color 0.2s',
                '&:hover': { color: '#2563eb' } 
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {socialLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <IconButton 
                key={i} 
                component="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small" 
                sx={{ 
                  color: '#3b82f6', 
                  bgcolor: 'rgba(59, 130, 246, 0.1)',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    color: '#ffffff', 
                    bgcolor: '#2563eb', 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                  } 
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            );
          })}
        </Box>
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: '#64748b', fontSize: '0.85rem' }}>
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

  // EPIC ID Logic
  const [epicIdModalOpen, setEpicIdModalOpen] = useState(false)
  const [epicIdInput, setEpicIdInput] = useState('')
  const [epicError, setEpicError] = useState('')
  const [epicLoading, setEpicLoading] = useState(false)
  const [userEpicId, setUserEpicId] = useState(localStorage.getItem('userEpicId') || null)

  React.useEffect(() => {
    const checkProfile = async () => {
      const token = localStorage.getItem('authToken')
      const role = localStorage.getItem('userRole')
      if (token && role === 'citizen' && !userEpicId) {
        try {
          const data = await apiClient.get('/auth/me')
          if (data.epicId) {
            setUserEpicId(data.epicId)
            localStorage.setItem('userEpicId', data.epicId)
          } else {
            setEpicIdModalOpen(true)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
    checkProfile()
  }, [userEpicId, location.pathname])

  const handleEpicSubmit = async () => {
    if (!epicIdInput.trim()) {
      setEpicError('EPIC ID is required')
      return
    }
    setEpicLoading(true)
    setEpicError('')
    try {
      const data = await apiClient.patch('/auth/profile', { epicId: epicIdInput.trim() })
      setUserEpicId(data.epicId)
      localStorage.setItem('userEpicId', data.epicId)
      setEpicIdModalOpen(false)
    } catch (err) {
      setEpicError(err.message)
    } finally {
      setEpicLoading(false)
    }
  }

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
              component={item.external ? 'a' : Link}
              {...(item.external ? { href: item.path, target: '_blank', rel: 'noopener noreferrer' } : { to: item.path })}
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

      {/* Global EPIC ID Lock Modal */}
      <Dialog open={epicIdModalOpen} disableEscapeKeyDown>
        <DialogTitle sx={{ color: '#d32f2f', fontWeight: 700 }}>Action Required: Link EPIC ID</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            To access citizen services, file complaints, or generate your QR slip, you must securely link your Voter ID (EPIC ID).
          </DialogContentText>
          {epicError && <Alert severity="error" sx={{ mb: 2 }}>{epicError}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Enter EPIC ID"
            fullWidth
            variant="outlined"
            value={epicIdInput}
            onChange={(e) => setEpicIdInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('userRole');
              localStorage.removeItem('userEpicId');
              setEpicIdModalOpen(false);
              navigate('/login');
            }} 
            color="inherit"
          >
            Logout
          </Button>
          <Button onClick={handleEpicSubmit} variant="contained" disabled={epicLoading} sx={{ bgcolor: '#16a34a' }}>
            {epicLoading ? <CircularProgress size={24} color="inherit" /> : 'Link Voter ID'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Layout