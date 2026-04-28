import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import BadgeIcon from '@mui/icons-material/Badge'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { auth } from '../config/firebase'

export default function Login() {
  const navigate = useNavigate()
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)
  const recaptchaRef = useRef(null)

  const [tab, setTab] = useState(0) // 0 = email, 1 = OTP
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [confirmResult, setConfirmResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  // Initialize Vanta.js clouds background
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
            skyColor: 0x1a237e,
            cloudColor: 0x3949ab,
            cloudShadowColor: 0x283593,
            sunColor: 0xf57c00,
            sunGlareColor: 0xff9933,
            sunlightColor: 0xffb74d,
            speed: 0.8,
          })
          console.log('Vanta initialized')
          if (timer) clearInterval(timer)
        } catch (e) {
          console.error('Vanta init error:', e)
        }
      }
    }

    // Try immediately
    initVanta()

    // If not ready, retry for 5 seconds
    timer = setInterval(initVanta, 500)

    return () => {
      if (timer) clearInterval(timer)
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  // Handle Email/Password Sign In
  const handleEmailAuth = async (e) => {
    e.preventDefault()
    if (!auth) {
      setError('Firebase is not configured. Check your .env file.')
      return
    }
    setLoading(true)
    setError('')
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      // Sync with backend
      const user = auth.currentUser
      const token = await user.getIdToken()
      const response = await fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          role: 'citizen',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Backend synchronization failed')
      }

      const data = await response.json()
      localStorage.setItem('authToken', token)
      localStorage.setItem('userEmail', user.email || '')
      localStorage.setItem('userRole', 'citizen')
      if (data.user && data.user.epicId) {
        localStorage.setItem('userEpicId', data.user.epicId)
      }
      navigate('/')
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, ''))
    } finally {
      setLoading(false)
    }
  }

  // Handle Phone OTP
  const handleSendOTP = async () => {
    if (!auth) {
      setError('Firebase is not configured. Check your .env file.')
      return
    }
    setLoading(true)
    setError('')
    try {
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        })
      }
      const formatted = phone.startsWith('+') ? phone : `+91${phone}`
      const result = await signInWithPhoneNumber(auth, formatted, recaptchaRef.current)
      setConfirmResult(result)
      setOtpSent(true)
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await confirmResult.confirm(otp)
      const user = result.user
      const token = await user.getIdToken()
      const response = await fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          phone: user.phoneNumber,
          role: 'citizen',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'OTP verification failed')
      }

      const data = await response.json()
      localStorage.setItem('authToken', token)
      localStorage.setItem('userPhone', user.phoneNumber || '')
      localStorage.setItem('userRole', 'citizen')
      if (data.user && data.user.epicId) {
        localStorage.setItem('userEpicId', data.user.epicId)
      }
      navigate('/')
    } catch (err) {
      setError('Invalid OTP. Please try again.')
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
        overflow: 'hidden',
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

      {/* Login Card */}
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
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            component="img"
            src="/images/logofull.jpeg"
            alt="Matdata Mitra Logo"
            sx={{ height: 80, mx: 'auto', mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            Election Commission of India
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 3, color: '#1a237e' }}>
          Portal Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Tabs: Email / OTP */}
        <Tabs
          value={tab}
          onChange={(_, v) => { setTab(v); setError('') }}
          centered
          sx={{
            mb: 3,
            '& .MuiTab-root': { fontWeight: 600, textTransform: 'none' },
            '& .Mui-selected': { color: '#1a237e' },
            '& .MuiTabs-indicator': { bgcolor: '#f57c00' },
          }}
        >
          <Tab icon={<EmailOutlinedIcon />} label="Email" iconPosition="start" />
          <Tab icon={<PhoneAndroidIcon />} label="OTP" iconPosition="start" />
        </Tabs>

        {/* Email/Password Form */}
        {tab === 0 && (
          <Box component="form" onSubmit={handleEmailAuth}>
            <TextField
              fullWidth
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: '#9e9e9e' }} />
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
              sx={{ mb: 1 }}
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
            <Typography
              variant="body2"
              sx={{ textAlign: 'right', mb: 2, color: '#1a237e', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              Forgot Password?
            </Typography>
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
                background: 'linear-gradient(90deg, #1a237e, #f57c00)',
                '&:hover': { background: 'linear-gradient(90deg, #0d1642, #e65100)' },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (isRegister ? 'Register' : 'Sign In')}
            </Button>
          </Box>
        )}

        {/* OTP Form */}
        {tab === 1 && (
          <Box>
            {!otpSent ? (
              <>
                <TextField
                  fullWidth
                  placeholder="Phone Number (10 digits)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidIcon sx={{ color: '#9e9e9e' }} />
                        <Typography sx={{ ml: 0.5, color: '#666', fontSize: '0.9rem' }}>+91</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  disabled={loading || phone.length !== 10}
                  onClick={handleSendOTP}
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '1rem',
                    borderRadius: 50,
                    background: 'linear-gradient(90deg, #1a237e, #f57c00)',
                    '&:hover': { background: 'linear-gradient(90deg, #0d1642, #e65100)' },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: '#9e9e9e' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  disabled={loading || otp.length !== 6}
                  onClick={handleVerifyOTP}
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '1rem',
                    borderRadius: 50,
                    background: 'linear-gradient(90deg, #1a237e, #f57c00)',
                    '&:hover': { background: 'linear-gradient(90deg, #0d1642, #e65100)' },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  sx={{ mt: 1 }}
                  onClick={() => { setOtpSent(false); setOtp('') }}
                >
                  ← Change Number
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Toggle register/login */}
        {tab === 0 && (
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: '#666' }}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Box
              component="span"
              onClick={() => { setIsRegister(!isRegister); setError('') }}
              sx={{ color: '#1a237e', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {isRegister ? 'Sign In' : 'Register Now'}
            </Box>
          </Typography>
        )}

        {/* Divider + BLO Login */}
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">or</Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<BadgeIcon />}
          onClick={() => navigate('/blo-login')}
          sx={{
            py: 1.2,
            borderRadius: 50,
            fontWeight: 600,
            borderColor: '#1a237e',
            color: '#1a237e',
            '&:hover': { bgcolor: 'rgba(26,35,126,0.05)', borderColor: '#0d1642' },
          }}
        >
          Login as BLO
        </Button>
      </Paper>

      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container" />
    </Box>
  )
}
