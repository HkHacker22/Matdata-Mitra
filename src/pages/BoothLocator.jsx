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
import { apiClient } from '../api/client'

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
  const [nearestBooth, setNearestBooth] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [mapCenter, setMapCenter] = useState(defaultCenter)
  const [mapZoom, setMapZoom] = useState(5)

  useEffect(() => {
    fetchMapData()
  }, [])

  const fetchMapData = async () => {
    setLoading(true)
    try {
      const data = await apiClient.get('/booths/map-data')
      setBooths(Array.isArray(data) ? data : [])
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
      async (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        setMapCenter({ lat: latitude, lng: longitude })
        setMapZoom(15)

        try {
          // Fetch nearest booth using geoclustering
          const data = await apiClient.get(`/booths/nearest?lat=${latitude}&lng=${longitude}&maxDistance=50000`)
          
          if (data.booths && data.booths.length > 0) {
            const nearest = data.booths[0]
            setNearestBooth(nearest)
            setSelectedBooth(nearest) // Auto-select on map
          } else {
            alert('No polling booths found within 50km of your location.')
            setNearestBooth(null)
          }
        } catch (error) {
          console.error('Failed to fetch nearest booth', error)
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
    const a = amenity.toLowerCase()
    if (a.includes('ramp')) return <AccessibleIcon fontSize="small" />
    if (a.includes('water')) return <WaterDropIcon fontSize="small" />
    if (a.includes('shade')) return <WeekendIcon fontSize="small" />
    if (a.includes('electricity')) return <AcUnitIcon fontSize="small" />
    return <LocationOnIcon fontSize="small" />
  }

  // Determine marker color based on verification ratio
  const getMarkerIcon = (booth) => {
    if (!booth) return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    
    const total = booth.totalVoters || 0
    const verified = booth.verifiedVoters || 0
    const ratio = total > 0 ? (verified / total) : 0
    
    let color = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' // Pending/Unverified
    
    if (total > 0 && verified === total) {
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

      <Card sx={{ mb: 3, borderLeft: '6px solid #FF9933' }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                onClick={handleUseCurrentLocation}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <MyLocationIcon />}
                sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' }, px: 3, py: 1, borderRadius: 2 }}
              >
                Find Nearest to Me
              </Button>
              <Typography variant="body2" color="text.secondary">
                Uses high-precision geolocation and database geoclustering (2dsphere) to detect your closest voting center.
              </Typography>
            </Box>
            
            {/* Legend */}
            <Box sx={{ display: 'flex', gap: 2, p: 1, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>100% Verified</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFC107' }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Partial</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F44336' }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Pending</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
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
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                styles: [
                  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
                ]
              }}
            >
              {userLocation && (
                <MarkerF
                  position={userLocation}
                  icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  title="Your Location"
                />
              )}

              {Array.isArray(booths) && booths.filter(b => b.location && b.location.coordinates).map((booth) => (
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
                      label={`${selectedBooth.verifiedVoters || 0} / ${selectedBooth.totalVoters || 0} Verified`} 
                      size="small" 
                      color={selectedBooth.totalVoters > 0 && selectedBooth.verifiedVoters === selectedBooth.totalVoters ? "success" : "warning"}
                      sx={{ mb: 1 }}
                    />
                    <Divider sx={{ my: 1 }} />
                    <Button
                      size="small"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 1, bgcolor: '#000080' }}
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

      {nearestBooth && (
        <Card sx={{ borderLeft: '6px solid #1a237e', animation: 'fadeIn 0.5s ease-out' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
                  Closest Polling Station Detected
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e' }}>
                  {nearestBooth.name}
                </Typography>
              </Box>
              <Chip label="Nearest" color="primary" size="small" />
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Full Address</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{nearestBooth.address}</Typography>
                
                <Typography variant="subtitle2" color="text.secondary">Constituency</Typography>
                <Typography variant="body1">{nearestBooth.constituency}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Facilities Available</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {Object.entries(nearestBooth.facilities || {}).filter(([k,v]) => v).map(([k,v]) => (
                    <Chip
                      key={k}
                      icon={getAmenityIcon(k)}
                      label={k.charAt(0).toUpperCase() + k.slice(1)}
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
                
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">BLO Contact</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{nearestBooth.bloName}</Typography>
                  <Typography variant="body2">{nearestBooth.bloPhone}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default BoothLocator