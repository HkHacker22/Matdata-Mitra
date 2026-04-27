import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import SendIcon from '@mui/icons-material/Send'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { complaintCategories, submitComplaint } from '../services/complaintService'

const steps = ['Select Category', 'Describe Issue', 'Add Location', 'Submit']

function Complaint() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    voterId: '',
    name: '',
    phone: '',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value })
  }

  const handleNext = () => {
    if (activeStep === 0 && !formData.category) {
      setError('Please select a category')
      return
    }
    if (activeStep === 1 && (!formData.title || !formData.description)) {
      setError('Please fill in all required fields')
      return
    }
    setError(null)
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
    setError(null)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitComplaint({
        ...formData,
        category: formData.category,
        title: formData.title,
        description: formData.description,
        voterId: formData.voterId || 'ANON',
      })
      setSubmitted(true)
    } catch (err) {
      setError('Failed to submit complaint. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000080' }}>
          File a Complaint
        </Typography>
        
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Complaint Submitted Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Your complaint has been registered. You will receive updates via SMS.
          </Typography>
          <Alert severity="info" sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
            Reference ID will be sent to your phone. Please save it for tracking.
          </Alert>
          <Button
            variant="contained"
            onClick={() => {
              setSubmitted(false)
              setActiveStep(0)
              setFormData({
                category: '',
                title: '',
                description: '',
                voterId: '',
                name: '',
                phone: '',
                address: '',
              })
            }}
            sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
          >
            File Another Complaint
          </Button>
        </Card>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000080' }}>
        File a Complaint
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Report any issues related to voting, polling stations, or election-related problems.
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                What is the issue about?
              </Typography>
              <Grid container spacing={2}>
                {complaintCategories.map((cat) => (
                  <Grid item xs={6} sm={4} key={cat.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        p: 2,
                        border: formData.category === cat.id ? '2px solid #FF9933' : '2px solid transparent',
                        '&:hover': { bgcolor: '#f5f5f5' },
                      }}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                    >
                      <Typography variant="h4" sx={{ mb: 1 }}>{cat.icon}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {cat.label}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Describe the Issue
              </Typography>
              <TextField
                fullWidth
                label="Complaint Title"
                placeholder="Brief summary of the issue"
                value={formData.title}
                onChange={handleChange('title')}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                placeholder="Provide details about what happened..."
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange('description')}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Your Voter ID (Optional)"
                placeholder="Enter your EPIC number if available"
                value={formData.voterId}
                onChange={handleChange('voterId')}
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your Contact Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange('name')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location / Area"
                    placeholder="Where did this issue occur?"
                    value={formData.address}
                    onChange={handleChange('address')}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Review & Submit
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please review your complaint details before submitting.
              </Alert>
              
              <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {complaintCategories.find(c => c.id === formData.category)?.label}
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary">Title</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{formData.title}</Typography>
                
                <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{formData.description}</Typography>
                
                <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                <Typography variant="body1">{formData.address || 'Not provided'}</Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#43A047' } }}
              >
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Alert severity="warning" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> For emergency issues on election day, call the helpline: 1950 (Toll-free)
        </Typography>
      </Alert>
    </Box>
  )
}

export default Complaint