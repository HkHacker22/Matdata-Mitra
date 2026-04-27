import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import Layout from './components/Layout'
import Home from './pages/Home'
import VoterSearch from './pages/VoterSearch'
import QRScanner from './pages/QRScanner'
import QRGenerator from './pages/QRGenerator'
import BoothLocator from './pages/BoothLocator'
import Complaint from './pages/Complaint'
import BLODashboard from './pages/BLODashboard'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voter-search" element={<VoterSearch />} />
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/qr-generator" element={<QRGenerator />} />
          <Route path="/booth-locator" element={<BoothLocator />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/blo-dashboard" element={<BLODashboard />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App