import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  InputAdornment,
  Button,
  Alert,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import QrCodeIcon from '@mui/icons-material/QrCode'
import MapIcon from '@mui/icons-material/Map'
import WarningIcon from '@mui/icons-material/Warning'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import CampaignIcon from '@mui/icons-material/Campaign'

const quickActions = [
  {
    title: 'Voter Search',
    description: 'Find your voting details using name, EPIC number, or address',
    icon: <SearchIcon sx={{ fontSize: 40 }} />,
    path: '/voter-search',
    color: '#FF9933',
  },
  {
    title: 'QR Scanner',
    description: 'Scan voter slip QR code to verify identity',
    icon: <QrCodeScannerIcon sx={{ fontSize: 40 }} />,
    path: '/qr-scanner',
    color: '#000080',
  },
  {
    title: 'QR Generator',
    description: 'Generate QR code for your voter slip',
    icon: <QrCodeIcon sx={{ fontSize: 40 }} />,
    path: '/qr-generator',
    color: '#228B22',
  },
  {
    title: 'Booth Locator',
    description: 'Find your nearest polling booth with directions',
    icon: <MapIcon sx={{ fontSize: 40 }} />,
    path: '/booth-locator',
    color: '#D32F2F',
  },
  {
    title: 'File Complaint',
    description: 'Report issues related to voting or polling station',
    icon: <WarningIcon sx={{ fontSize: 40 }} />,
    path: '/complaint',
    color: '#FF5722',
  },
  {
    title: 'BLO Dashboard',
    description: 'Booth Level Officer management portal',
    icon: <HowToVoteIcon sx={{ fontSize: 40 }} />,
    path: '/blo-dashboard',
    color: '#9C27B0',
  },
]

const announcements = [
  {
    id: 1,
    title: 'Assembly Elections 2024',
    date: '15 Jan 2024',
    text: 'Voting for Delhi Assembly Elections scheduled for next month. Check your name in voter list.',
  },
  {
    id: 2,
    title: 'New Voter Registration',
    date: '10 Jan 2024',
    text: 'Last date for new voter registration is approaching. Register now to exercise your right to vote.',
  },
  {
    id: 3,
    title: 'Electoral Roll Update',
    date: '05 Jan 2024',
    text: 'Draft electoral roll published. Check and update your details.',
  },
]

function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/voter-search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <Box>
      <Box
        sx={{
          bgcolor: '#000080',
          color: 'white',
          py: { xs: 4, md: 6 },
          px: 2,
          mb: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          मतदान मित्र
        </Typography>
        <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
          Your Election Companion
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto', opacity: 0.85 }}>
          Find your polling station, check voter details, generate voter slips, and report issues - all in one place.
        </Typography>
        
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
          <TextField
            fullWidth
            placeholder="Search by name, EPIC number, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={handleSearch}
                    variant="contained"
                    sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#000080' }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={4} key={action.path}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                component={Link}
                to={action.path}
                sx={{ height: '100%', p: 1 }}
              >
                <CardContent>
                  <Box sx={{ color: action.color, mb: 2 }}>{action.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#000080' }}>
        Election Updates
      </Typography>
      <Grid container spacing={2}>
        {announcements.map((announcement) => (
          <Grid item xs={12} md={4} key={announcement.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CampaignIcon sx={{ color: '#FF9933' }} />
                  <Typography variant="caption" color="text.secondary">
                    {announcement.date}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {announcement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {announcement.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert
        severity="info"
        icon={<HowToVoteIcon />}
        sx={{ mt: 4, bgcolor: '#E3F2FD' }}
      >
        <Typography variant="body2">
          <strong>Remember:</strong> Bring your Voter ID (EPIC) to the polling station. Voting hours are 7:00 AM to 6:00 PM.
        </Typography>
      </Alert>
    </Box>
  )
}

export default Home