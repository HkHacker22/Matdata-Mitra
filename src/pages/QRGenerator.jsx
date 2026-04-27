import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material'
import QrCodeIcon from '@mui/icons-material/QrCode'
import DownloadIcon from '@mui/icons-material/Download'
import { searchVoters, generateVoterQRData } from '../services/voterService'
import QRCode from 'qrcode'

function QRGenerator() {
  const [searchParams] = useSearchParams()
  const [selectedVoter, setSelectedVoter] = useState(null)
  const [voters, setVoters] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const voterId = searchParams.get('voterId')
    if (voterId) {
      loadVoter(voterId)
    }
  }, [searchParams])

  const loadVoter = async (voterId) => {
    setLoading(true)
    try {
      const data = await searchVoters(voterId)
      if (data.length > 0) {
        setSelectedVoter(data[0])
        await generateQR(data[0])
      }
    } catch (err) {
      setError('Failed to load voter')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchVoters = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    setError(null)
    try {
      const data = await searchVoters(searchQuery)
      setVoters(data)
      if (data.length === 0) {
        setError('No voters found')
      }
    } catch (err) {
      setError('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectVoter = async (voter) => {
    setSelectedVoter(voter)
    await generateQR(voter)
  }

  const generateQR = async (voter) => {
    try {
      const qrData = generateVoterQRData(voter)
      const url = await QRCode.toDataURL(qrData, {
        width: 250,
        margin: 2,
        color: {
          dark: '#000080',
          light: '#FFFFFF',
        },
      })
      setQrCodeUrl(url)
    } catch (err) {
      setError('Failed to generate QR code')
    }
  }

  const handleDownload = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.download = `voter-slip-${selectedVoter.voterId}.png`
    link.href = qrCodeUrl
    link.click()
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000080' }}>
        Generate Voter Slip QR
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Generate a QR code for your voter slip to use at the polling station.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Search Voter
              </Typography>
              
              {error && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search by name or EPIC number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchVoters()}
                />
                <Button
                  variant="contained"
                  onClick={handleSearchVoters}
                  disabled={loading}
                  sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
                >
                  Search
                </Button>
              </Box>

              {voters.length > 0 && !selectedVoter && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Select a voter:
                  </Typography>
                  {voters.map((voter) => (
                    <Card
                      key={voter.id}
                      sx={{
                        mb: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#f5f5f5' },
                      }}
                      onClick={() => handleSelectVoter(voter)}
                    >
                      <CardContent sx={{ py: 1.5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {voter.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          EPIC: {voter.voterId} | {voter.assemblyConstituency}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Voter Slip QR Code
              </Typography>

              {loading && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress sx={{ mb: 2 }} />
                  <Typography>Generating QR code...</Typography>
                </Box>
              )}

              {!loading && selectedVoter && qrCodeUrl && (
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'white',
                      border: '2px dashed #FF9933',
                      borderRadius: 2,
                      mb: 2,
                      display: 'inline-block',
                    }}
                  >
                    <img src={qrCodeUrl} alt="QR Code" style={{ display: 'block' }} />
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {selectedVoter.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    EPIC: {selectedVoter.voterId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Part No: {selectedVoter.partNo} | Section: {selectedVoter.sectionNo}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    onClick={handleDownload}
                    startIcon={<DownloadIcon />}
                    sx={{ mt: 2, bgcolor: '#000080' }}
                  >
                    Download QR Code
                  </Button>
                </Box>
              )}

              {!loading && !selectedVoter && (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  <QrCodeIcon sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                  <Typography>
                    Search and select a voter to generate QR code
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> This QR code is a demo. In production, it would be generated with secure cryptographic signatures from the Election Commission.
        </Typography>
      </Alert>
    </Box>
  )
}

export default QRGenerator