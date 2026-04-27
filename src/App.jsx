import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, Box, CircularProgress } from '@mui/material'
import Layout from './components/Layout'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
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
      main: '#FF9933',
    },
    secondary: {
      main: '#000080',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
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
  },
})

const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <CircularProgress sx={{ color: '#FF9933' }} />
  </Box>
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="voter-search" element={<VoterSearch />} />
            <Route path="qr-scanner" element={<QRScanner />} />
            <Route path="qr-generator" element={<QRGenerator />} />
            <Route path="booth-locator" element={<BoothLocator />} />
            <Route path="complaint" element={<Complaint />} />
            <Route path="blo-dashboard" element={<BLODashboard />} />
            <Route path="elections" element={<ElectionDashboard />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App