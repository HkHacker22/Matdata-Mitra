import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material'
import MapIcon from '@mui/icons-material/Map'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AccessibleIcon from '@mui/icons-material/Accessible'
import WeekendIcon from '@mui/icons-material/Weekend'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api'

// Use actual API key from env
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '12px',
}

// Center of India roughly
const defaultCenter = {
  lat: 22.5937,
  lng: 78.9629,
}

function BoothLocator() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  })

  const [booths, setBooths] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedBooth, setSelectedBooth] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [mapZoom, setMapZoom] = useState(5)

  useEffect(() => {
    fetchMapData()
  }, [])

  const fetchMapData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/booths/map-data')
      const data = await res.json()
      setBooths(data)
    } catch (error) {
      console.error('Failed to fetch map data', error)
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
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        setMapCenter({ lat: latitude, lng: longitude })
        setMapZoom(12)
        setLoading(false)
      },
      (error) => {
        alert('Unable to get your location. Please enable location services.')
        setLoading(false)
      }
    )
  }

  const getAmenityIcon = (amenity) => {
    if (amenity.toLowerCase().includes('ramp')) return <AccessibleIcon fontSize="small" />
    if (amenity.toLowerCase().includes('water')) return <WaterDropIcon fontSize="small" />
    if (amenity.toLowerCase().includes('shade')) return <WeekendIcon fontSize="small" />
    if (amenity.toLowerCase().includes('electricity')) return <AcUnitIcon fontSize="small" />
    return <LocationOnIcon fontSize="small" />
  }

  // Determine marker color based on verification ratio
  const getMarkerIcon = (booth) => {
    const ratio = booth.totalVoters > 0 ? (booth.verifiedVoters / booth.totalVoters) : 0
    let color = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' // Pending/Unverified
    
    if (booth.totalVoters > 0 && booth.verifiedVoters === booth.totalVoters) {
      color = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' // 100% verified
    } else if (ratio > 0.5) {
      color = 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' // Mostly verified
    }

    return color
  }

  if (loadError) {
    return <Alert severity="error">Error loading Google Maps</Alert>
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000080' }}>
        Interactive Polling Booth Locator
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Find your nearest polling booth using the interactive map. Pin colors represent the verification status of the booth's voters (Green = Fully Verified, Red = Unverified).
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={handleUseCurrentLocation}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <MyLocationIcon />}
              sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
            >
              Find Nearest to Me
            </Button>
            <Typography variant="body2" color="text.secondary">
              Enable location services to geocluster booths near you.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: 0, position: 'relative' }}>
          {!isLoaded ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
              <CircularProgress />
            </Box>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={mapZoom}
              onClick={() => setSelectedBooth(null)}
            >
              {userLocation && (
                <MarkerF
                  position={userLocation}
                  icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  title="Your Location"
                />
              )}

              {booths.filter(b => b.location && b.location.coordinates).map((booth) => (
                <MarkerF
                  key={booth._id}
                  position={{ lat: booth.location.coordinates[1], lng: booth.location.coordinates[0] }}
                  onClick={() => setSelectedBooth(booth)}
                  icon={getMarkerIcon(booth)}
                />
              ))}

              {selectedBooth && (
                <InfoWindowF
                  position={{ lat: selectedBooth.location.coordinates[1], lng: selectedBooth.location.coordinates[0] }}
                  onCloseClick={() => setSelectedBooth(null)}
                >
                  <Box sx={{ p: 1, maxWidth: 250 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#000080' }}>
                      {selectedBooth.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {selectedBooth.address}
                    </Typography>
                    <Chip 
                      label={`${selectedBooth.verifiedVoters} / ${selectedBooth.totalVoters} Verified`} 
                      size="small" 
                      color={selectedBooth.totalVoters > 0 && selectedBooth.verifiedVoters === selectedBooth.totalVoters ? "success" : "error"}
                      sx={{ mb: 1 }}
                    />
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {Object.entries(selectedBooth.facilities).filter(([k,v]) => v).map(([k,v]) => (
                        <Chip
                          key={k}
                          icon={getAmenityIcon(k)}
                          label={k}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2, bgcolor: '#000080' }}
                      onClick={() => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedBooth.location.coordinates[1]},${selectedBooth.location.coordinates[0]}`
                        window.open(url, '_blank')
                      }}
                    >
                      Get Directions
                    </Button>
                  </Box>
                </InfoWindowF>
              )}
            </GoogleMap>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default BoothLocator