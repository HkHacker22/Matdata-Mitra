import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { apiClient, USE_MOCKS } from '../api/client'

export default function BLOLogin() {
  const navigate = useNavigate()
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)

  const [bloId, setBloId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let timer;
    const initVanta = () => {
      if (window.VANTA && window.VANTA.CLOUDS && vantaRef.current && !vantaEffect.current) {
        try {
          vantaEffect.current = window.VANTA.CLOUDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            skyColor: 0x0d1642,
            cloudColor: 0x1a237e,
            cloudShadowColor: 0x0a0e2a,
            sunColor: 0xd32f2f,
            sunGlareColor: 0xf44336,
            sunlightColor: 0xef5350,
            speed: 0.6,
          })
          if (timer) clearInterval(timer)
        } catch (e) {
          console.error('Vanta init error:', e)
        }
      }
    }

    initVanta()
    timer = setInterval(initVanta, 500)

    return () => {
      if (timer) clearInterval(timer)
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  const handleBloLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // 1. Firebase Authentication
      console.log('⏳ Authenticating with Firebase...')
      let user;
      try {
        await signInWithEmailAndPassword(auth, bloId, password)
        user = auth.currentUser
      } catch (fbErr) {
        console.error('Firebase Auth Error:', fbErr)
        if (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/wrong-password' || fbErr.code === 'auth/invalid-credential') {
          throw new Error('Invalid BLO credentials. Please check your Email and Password.')
        }
        throw new Error(fbErr.message.replace('Firebase: ', ''))
      }

      // 2. Backend Synchronization & Role Verification
      console.log('⏳ Verifying BLO role with backend...')
      try {
        const token = await user.getIdToken()
        const response = await apiClient.post('/auth/verify-token', {
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          role: 'blo',
        })
        
        // Use backend token if returned, otherwise fallback to Firebase token
        localStorage.setItem('authToken', response.token || token)
        localStorage.setItem('userRole', 'blo')
        localStorage.setItem('userName', response.user?.name || user.displayName || 'BLO Officer')
        
        console.log('✅ BLO Login successful')
        navigate('/blo-dashboard')
      } catch (apiErr) {
        console.error('Backend Sync Error:', apiErr)
        if (apiErr.status === 403) {
          throw new Error('Access Denied. This account is not authorized as a BLO in the database.')
        }
        if (apiErr.status === 0) {
          throw new Error('Server connection failed. Please ensure the backend is running.')
        }
        throw apiErr
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        p: 2,
      }}
    >
      {/* Vanta Background Layer */}
      <Box
        ref={vantaRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      />

      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          p: 4,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)',
          zIndex: 1,
        }}
      >
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/login')}
          sx={{ mb: 2, color: '#1a237e', textTransform: 'none' }}
        >
          Back to Citizen Login
        </Button>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            component="img"
            src="/images/logo only.jpeg"
            alt="Matdata Mitra"
            sx={{ height: 70, mx: 'auto', mb: 1 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e' }}>
            BLO Portal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Booth Level Officer Login
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleBloLogin}>
          <TextField
            fullWidth
            placeholder="BLO Email / ID"
            value={bloId}
            onChange={(e) => setBloId(e.target.value)}
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon sx={{ color: '#9e9e9e' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: '#9e9e9e' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: 50,
              background: 'linear-gradient(90deg, #d32f2f, #f57c00)',
              '&:hover': { background: 'linear-gradient(90deg, #b71c1c, #e65100)' },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In as BLO'}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
