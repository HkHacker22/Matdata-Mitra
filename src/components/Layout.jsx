import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
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
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import QrCodeIcon from '@mui/icons-material/QrCode'
import MapIcon from '@mui/icons-material/Map'
import WarningIcon from '@mui/icons-material/Warning'
import DashboardIcon from '@mui/icons-material/Dashboard'

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Voter Search', path: '/voter-search', icon: <SearchIcon /> },
  { label: 'QR Scanner', path: '/qr-scanner', icon: <QrCodeScannerIcon /> },
  { label: 'QR Generator', path: '/qr-generator', icon: <QrCodeIcon /> },
  { label: 'Booth Locator', path: '/booth-locator', icon: <MapIcon /> },
  { label: 'Complaint', path: '/complaint', icon: <WarningIcon /> },
  { label: 'BLO Dashboard', path: '/blo-dashboard', icon: <DashboardIcon /> },
]

function Header({ onMenuClick }) {
  const location = useLocation()
  
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1A237E' }}>
      <Toolbar>
        {onMenuClick && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              bgcolor: '#F57C00',
              color: 'white',
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: '0.875rem',
            }}
          >
            मतदान
          </Box>
          Matdata Mitra
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          {navItems.slice(1).map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color="inherit"
              sx={{
                bgcolor: location.pathname === item.path ? 'rgba(245,124,0,0.2)' : 'transparent',
              }}
            >
              {item.label}
            </Button>
          ))}
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
        bgcolor: '#1A237E',
        color: 'white',
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
        <Typography variant="body2">
          © 2026 Matdata Mitra. Government of India.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography variant="body2" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
            Home
          </Typography>
          <Typography variant="body2" component={Link} to="/complaint" sx={{ color: 'white', textDecoration: 'none' }}>
            Help
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Privacy Policy
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Typography variant="h6" sx={{ px: 2, mb: 2, fontWeight: 700, color: '#1A237E' }}>
        Matdata Mitra
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { bgcolor: 'rgba(245,124,0,0.1)' },
            }}
          >
            <ListItemIcon sx={{ color: '#F57C00' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onMenuClick={isMobile ? handleDrawerToggle : null} />
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, py: 2, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
      {/* Footer disabled here, rendered by Home page itself now, but keeping component for other pages if needed. We'll hide it if we are on root '/' */}
      {location.pathname !== '/' && <Footer />}
    </Box>
  )
}

export default Layout