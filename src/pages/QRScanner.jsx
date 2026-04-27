import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import PersonIcon from '@mui/icons-material/Person'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { getVoterById } from '../services/voterService'

function QRScanner() {
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [voterData, setVoterData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const scannerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    }
  }, [])

  const startScanning = () => {
    setScanning(true)
    setError(null)
    setScanResult(null)
    setVoterData(null)

    setTimeout(() => {
      try {
        const scanner = new Html5QrcodeScanner(
          'qr-reader',
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          false
        )

        scannerRef.current = scanner

        scanner.render(
          async (decodedText) => {
            scanner.pause()
            setScanResult(decodedText)
            await processQRData(decodedText)
          },
          (error) => {
            console.warn('QR scan error:', error)
          }
        )
      } catch (err) {
        setError('Failed to start camera. Please ensure camera permissions are granted.')
        setScanning(false)
      }
    }, 500)
  }

  const processQRData = async (qrData) => {
    setLoading(true)
    try {
      const parsed = JSON.parse(qrData)
      if (parsed.id) {
        const voter = await getVoterById(parsed.id)
        if (voter) {
          setVoterData(voter)
        } else {
          setError('Voter not found in database')
        }
      } else {
        setError('Invalid QR code format')
      }
    } catch (err) {
      setError('Could not parse QR code data')
    } finally {
      setLoading(false)
      setScanning(false)
    }
  }

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
    }
    setScanning(false)
    setScanResult(null)
  }

  const resetScanner = () => {
    setScanResult(null)
    setVoterData(null)
    setError(null)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000080' }}>
        QR Scanner
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Scan the QR code on your voter slip to verify your identity at the polling station.
      </Typography>

      <Card>
        <CardContent>
          {!scanning && !scanResult && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <QrCodeScannerIcon sx={{ fontSize: 80, color: '#FF9933', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ready to Scan
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Click the button below to start scanning your voter slip QR code
              </Typography>
              <Button
                variant="contained"
                onClick={startScanning}
                startIcon={<QrCodeScannerIcon />}
                sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
              >
                Start Scanning
              </Button>
            </Box>
          )}

          {scanning && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Position the QR code within the frame
              </Typography>
              <div id="qr-reader" style={{ width: '100%', maxWidth: 400, margin: '0 auto' }} />
              <Button
                variant="outlined"
                onClick={stopScanning}
                sx={{ mt: 2 }}
              >
                Cancel
              </Button>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography>Verifying voter data...</Typography>
            </Box>
          )}

          {scanResult && voterData && (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                ✅ Voter verified successfully!
              </Alert>
              <Card sx={{ bgcolor: '#E8F5E9', border: '2px solid #4CAF50' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: '#4CAF50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {voterData.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        EPIC: {voterData.voterId}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip label={`Age: ${voterData.age}`} />
                    <Chip label={voterData.gender} />
                    <Chip label={voterData.assemblyConstituency} />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Polling Station:</strong> {voterData.pollingStation}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Part No:</strong> {voterData.partNo} | <strong>Section:</strong> {voterData.sectionNo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {voterData.address}
                  </Typography>
                </CardContent>
              </Card>
              <Button
                variant="contained"
                onClick={resetScanner}
                sx={{ mt: 2, bgcolor: '#000080' }}
              >
                Scan Another
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> This is a demo feature. In production, this would connect to the Election Commission database for real-time verification.
        </Typography>
      </Alert>
    </Box>
  )
}

export default QRScanner