import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress } from '@mui/material'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const BLOLogin = lazy(() => import('./pages/BLOLogin'))
const VoterSearch = lazy(() => import('./pages/VoterSearch'))
const QRScanner = lazy(() => import('./pages/QRScanner'))
const QRGenerator = lazy(() => import('./pages/QRGenerator'))
const BoothLocator = lazy(() => import('./pages/BoothLocator'))
const Complaint = lazy(() => import('./pages/Complaint'))
const BLODashboard = lazy(() => import('./pages/BLODashboard'))
const ElectionDashboard = lazy(() => import('./pages/ElectionDashboard'))
const Notifications = lazy(() => import('./pages/Notifications'))

const theme = createTheme({
  palette: {
    primary: {
      main: '#16a34a',
    },
    secondary: {
      main: '#1a237e',
    },
    background: {
      default: '#f9fafb',
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 },
    h2: { fontSize: '1.5rem', fontWeight: 700 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <CircularProgress sx={{ color: '#16a34a' }} />
  </Box>
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth pages — no Layout wrapper */}
          <Route path="/login" element={<Login />} />
          <Route path="/blo-login" element={<BLOLogin />} />

          {/* Main app with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="voter-search" element={<VoterSearch />} />
            
            {/* Protected BLO Routes */}
            <Route 
              path="qr-scanner" 
              element={<ProtectedRoute requiredRole="blo"><QRScanner /></ProtectedRoute>} 
            />
            <Route 
              path="blo-dashboard" 
              element={<ProtectedRoute requiredRole="blo"><BLODashboard /></ProtectedRoute>} 
            />
            
            {/* Public/General Routes */}
            <Route path="qr-generator" element={<QRGenerator />} />
            <Route path="booth-locator" element={<BoothLocator />} />
            <Route path="complaint" element={<Complaint />} />
            <Route path="elections" element={<ElectionDashboard />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App