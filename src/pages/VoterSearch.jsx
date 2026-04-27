import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BadgeIcon from '@mui/icons-material/Badge'
import { searchVoters } from '../services/voterService'

function VoterSearch() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    setSearched(true)
    try {
      const data = await searchVoters(query)
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchParams.get('q')) {
      setQuery(searchParams.get('q'))
      handleSearch()
    }
  }, [searchParams])

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000080' }}>
        Voter Search
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Search for voter details by name, EPIC number, or address.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              placeholder="Enter name, EPIC number, or address..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
              sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' }, minWidth: 120 }}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {searched && !loading && results.length === 0 && (
        <Alert severity="warning">
          No voters found matching "{query}". Please try a different search term.
        </Alert>
      )}

      {results.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Found {results.length} result(s)
          </Typography>
          <Grid container spacing={2}>
            {results.map((voter) => (
              <Grid item xs={12} md={6} key={voter.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: '#FF9933',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <PersonIcon />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {voter.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <BadgeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            EPIC: {voter.voterId}
                          </Typography>
                          <Chip label={`Age: ${voter.age}`} size="small" />
                          <Chip label={voter.gender} size="small" />
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOnIcon fontSize="small" color="action" />
                            <Typography variant="body2">
                              {voter.assemblyConstituency}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            📍 {voter.address}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            🏢 Polling Station: {voter.pollingStation}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            📋 Part No: {voter.partNo} | Section: {voter.sectionNo}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to={`/qr-generator?voterId=${voter.id}`}
                        sx={{ borderColor: '#FF9933', color: '#FF9933' }}
                      >
                        Generate QR
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        component={Link}
                        to={`/booth-locator?constituency=${encodeURIComponent(voter.assemblyConstituency)}`}
                        sx={{ bgcolor: '#000080' }}
                      >
                        View Booth
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default VoterSearch