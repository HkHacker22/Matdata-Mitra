import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Rating,
} from '@mui/material'
import MapIcon from '@mui/icons-material/Map'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchIcon from '@mui/icons-material/Search'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AccessibleIcon from '@mui/icons-material/Accessible'
import WeekendIcon from '@mui/icons-material/Weekend'
import acUnitIcon from '@mui/icons-material/AcUnit'
import { searchBooths, getNearestBooths } from '../services/boothService'

function BoothLocator() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('constituency') || '')
  const [booths, setBooths] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedBooth, setSelectedBooth] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    const constituency = searchParams.get('constituency')
    if (constituency) {
      setQuery(constituency)
      handleSearch()
    }
  }, [searchParams])

  const handleSearch = async () => {
    if (!query.trim() && !userLocation) return
    
    setLoading(true)
    try {
      const data = await searchBooths(query)
      setBooths(data)
      if (data.length > 0) {
        setSelectedBooth(data[0])
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        
        try {
          const data = await getNearestBooths(latitude, longitude)
          setBooths(data)
          if (data.length > 0) {
            setSelectedBooth(data[0])
          }
        } catch (error) {
          console.error('Error finding nearest booths:', error)
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        alert('Unable to get your location. Please enable location services.')
        setLoading(false)
      }
    )
  }

  const getAmenityIcon = (amenity) => {
    if (amenity.toLowerCase().includes('wheelchair')) return <AccessibleIcon fontSize="small" />
    if (amenity.toLowerCase().includes('water')) return <WaterDropIcon fontSize="small" />
    if (amenity.toLowerCase().includes('shade')) return <WeekendIcon fontSize="small" />
    if (amenity.toLowerCase().includes('fan')) return <acUnitIcon fontSize="small" />
    return <LocationOnIcon fontSize="small" />
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000080' }}>
        Polling Booth Locator
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Find your nearest polling booth and get directions to reach there on election day.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              placeholder="Search by area, constituency, or booth name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              startIcon={<SearchIcon />}
              sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={handleUseCurrentLocation}
              startIcon={loading ? <CircularProgress size={20} /> : <MyLocationIcon />}
              sx={{ borderColor: '#000080', color: '#000080' }}
            >
              Use My Location
            </Button>
          </Box>
        </CardContent>
      </Card>

      {userLocation && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Showing booths nearest to your current location
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {booths.length} booth(s) found
          </Typography>
          <List>
            {booths.map((booth, index) => (
              <Card
                key={booth.id}
                sx={{
                  mb: 1,
                  cursor: 'pointer',
                  border: selectedBooth?.id === booth.id ? '2px solid #FF9933' : '2px solid transparent',
                  '&:hover': { bgcolor: '#f5f5f5' },
                }}
                onClick={() => setSelectedBooth(booth)}
              >
                <ListItem>
                  <ListItemIcon>
                    <MapIcon sx={{ color: selectedBooth?.id === booth.id ? '#FF9933' : '#000080' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {booth.name}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {booth.address}
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                          <Chip
                            label={booth.constituency}
                            size="small"
                            sx={{ mr: 0.5, bgcolor: '#E3F2FD' }}
                          />
                          <Chip
                            label={`${booth.totalVoters} voters`}
                            size="small"
                            sx={{ bgcolor: '#FFF3E0' }}
                          />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </Card>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={7}>
          {selectedBooth && (
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#000080' }}>
                  {selectedBooth.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="body1">{selectedBooth.address}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Constituency</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedBooth.constituency}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Total Voters</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedBooth.totalVoters}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Booths</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedBooth.booths}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Timing</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedBooth.timing}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Amenities</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {selectedBooth.amenities.map((amenity, idx) => (
                    <Chip
                      key={idx}
                      icon={getAmenityIcon(amenity)}
                      label={amenity}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
                    onClick={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedBooth.lat},${selectedBooth.lng}`
                      window.open(url, '_blank')
                    }}
                  >
                    Get Directions
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    to={`/voter-search?constituency=${encodeURIComponent(selectedBooth.constituency)}`}
                    sx={{ borderColor: '#000080', color: '#000080' }}
                  >
                    Find Voters
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {!selectedBooth && !loading && booths.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <MapIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Search for a polling booth
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your area or use your current location
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default BoothLocator