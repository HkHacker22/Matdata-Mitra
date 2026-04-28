import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Alert,
  LinearProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import RefreshIcon from '@mui/icons-material/Refresh'
import { getComplaints, updateComplaintStatus } from '../services/complaintService'
import { getVoterStats, getRecentVerifications } from '../services/voterService'

function BLODashboard() {
  const [currentTab, setCurrentTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const [complaints, setComplaints] = useState([])
  const [complaintFilter, setComplaintFilter] = useState('pending')
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  const [stats, setStats] = useState({ totalAssigned: 0, verified: 0, pending: 0, verifiedByMe: 0 })
  const [verifications, setVerifications] = useState([])
  const [boothAssignments, setBoothAssignments] = useState([])

  const loadDashboardData = async () => {
    fetchComplaints()
    try {
      const [statsData, verificationsData, mapDataRes] = await Promise.all([
        getVoterStats(),
        getRecentVerifications(),
        fetch('/api/booths/map-data')
      ])
      setStats(statsData)
      setVerifications(verificationsData)
      
      const mapData = await mapDataRes.json()
      // Use map data to dynamically populate booth assignments
      const mappedBooths = mapData.map(b => ({
        id: b._id.substring(b._id.length - 4).toUpperCase(),
        name: b.name,
        voters: b.totalVoters,
        verified: b.verifiedVoters,
        pending: b.totalVoters - b.verifiedVoters
      }))
      setBoothAssignments(mappedBooths)
      setVerifications(verificationsData)
    } catch (err) {
      console.error('Failed to load dashboard data', err)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const fetchComplaints = async () => {
    try {
      const data = await getComplaints()
      setComplaints(data.complaints || [])
    } catch (err) {
      console.error('Failed to fetch complaints', err)
    }
  }

  const handleResolve = async (id) => {
    try {
      await updateComplaintStatus(id, 'resolved', 'Resolved by BLO')
      setSelectedComplaint(null)
      fetchComplaints()
    } catch (err) {
      console.error('Failed to resolve', err)
    }
  }

  const pendingList = complaints.filter(c => c.status === 'pending' || c.status === 'in_progress')
  const resolvedList = complaints.filter(c => c.status === 'resolved')

  const bloStatsDynamic = {
    ...stats,
    complaints: pendingList.length,
  }

  const getVerifiedPercentage = () => {
    if (stats.totalAssigned === 0) return 0
    return Math.round((stats.verified / stats.totalAssigned) * 100)
  }

  const renderOverview = () => (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD', borderLeft: '4px solid #000080' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Total Voters</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.totalAssigned}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#000080' }}><PeopleIcon /></Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9', borderLeft: '4px solid #4CAF50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Verified</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.verified}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#4CAF50' }}><CheckCircleIcon /></Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF3E0', borderLeft: '4px solid #FF9933' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Pending</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.pending}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#FF9933' }}><WarningIcon /></Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE', borderLeft: '4px solid #D32F2F' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Complaints</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{bloStatsDynamic.complaints}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#D32F2F' }}><HowToVoteIcon /></Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Verification Progress</Typography>
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Voter Verification</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{getVerifiedPercentage()}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={getVerifiedPercentage()}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: '#E0E0E0',
                '& .MuiLinearProgress-bar': { bgcolor: '#4CAF50', borderRadius: 5 }
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {stats.verified} of {stats.totalAssigned} voters verified
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Booth Assignments</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Booth</TableCell>
                      <TableCell>Voters</TableCell>
                      <TableCell>Verified</TableCell>
                      <TableCell>Progress</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {boothAssignments.map((booth) => (
                      <TableRow key={booth.id}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{booth.name}</Typography>
                        </TableCell>
                        <TableCell>{booth.voters}</TableCell>
                        <TableCell>{booth.verified}</TableCell>
                        <TableCell>
                          <LinearProgress
                            variant="determinate"
                            value={(booth.verified / booth.voters) * 100}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Pending Complaints</Typography>
              {pendingList.slice(0, 5).map((complaint) => (
                <Box
                  key={complaint._id}
                  onClick={() => setSelectedComplaint(complaint)}
                  sx={{
                    p: 2,
                    mb: 1,
                    bgcolor: '#FFF3E0',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: '#FFE0B2', transform: 'translateY(-2px)' }
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{complaint.type.toUpperCase()}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Chip
                    label="Pending"
                    size="small"
                    color="warning"
                  />
                </Box>
              ))}
              {pendingList.length === 0 && (
                <Typography variant="body2" color="text.secondary">No pending complaints.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )

  const renderVerifications = () => (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="Search by voter name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a2e' } }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              startIcon={<QrCodeScannerIcon />}
              component={Link}
              to="/qr-scanner"
              sx={{ borderColor: '#000080', color: '#000080' }}
            >
              QR Verify
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Recent Verifications</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Voter ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Booth</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {verifications.map((voter) => (
                  <TableRow key={voter._id}>
                    <TableCell>{voter.voterId}</TableCell>
                    <TableCell>{voter.name}</TableCell>
                    <TableCell>{voter.pollingStation}</TableCell>
                    <TableCell>{new Date(voter.verifiedAt).toLocaleTimeString()}</TableCell>
                    <TableCell>
                      <Chip
                        label="verified"
                        size="small"
                        color="success"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <CheckCircleIcon color="success" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {verifications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No recent verifications</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000080' }}>
          BLO Dashboard
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={loadDashboardData}
          sx={{ borderColor: '#000080', color: '#000080' }}
        >
          Refresh
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Logged in as Booth Level Officer (BLO) - Sector-15, Rohini, Delhi-42
        </Typography>
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
          <Tab label="Overview" />
          <Tab label="Verifications" />
          <Tab label="My Booths" />
          <Tab label="Complaints" />
        </Tabs>
      </Box>

      {currentTab === 0 && renderOverview()}
      {currentTab === 1 && renderVerifications()}
      {currentTab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>My Assigned Booths</Typography>
          {boothAssignments.map((booth) => (
            <Card key={booth.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6">{booth.name}</Typography>
                    <Typography variant="body2" color="text.secondary">ID: {booth.id}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{booth.voters}</Typography>
                    <Typography variant="body2" color="text.secondary">Total Voters</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      {currentTab === 3 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6">Complaints Management</Typography>
            <ToggleButtonGroup
              color="primary"
              value={complaintFilter}
              exclusive
              onChange={(e, val) => val && setComplaintFilter(val)}
              size="small"
              sx={{ bgcolor: '#fff' }}
            >
              <ToggleButton value="pending" sx={{ px: 3, fontWeight: 600 }}>Pending ({pendingList.length})</ToggleButton>
              <ToggleButton value="resolved" sx={{ px: 3, fontWeight: 600 }}>Resolved ({resolvedList.length})</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          <Grid container spacing={2}>
            {(complaintFilter === 'pending' ? pendingList : resolvedList).map((c) => (
              <Grid item xs={12} sm={6} md={4} key={c._id}>
                <Card 
                  onClick={() => setSelectedComplaint(c)}
                  sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'flex-start' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a237e' }}>
                        {c.type.toUpperCase().replace('_', ' ')}
                      </Typography>
                      <Chip 
                        label={c.status.toUpperCase()} 
                        size="small" 
                        color={c.status === 'resolved' ? 'success' : 'warning'} 
                        sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 40 }}>
                      {c.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                      <span>{c.location?.address || 'No Location'}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {(complaintFilter === 'pending' ? pendingList : resolvedList).length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>No complaints found.</Alert>
          )}
        </Box>
      )}

      {/* Complaint Dialog */}
      <Dialog open={!!selectedComplaint} onClose={() => setSelectedComplaint(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {selectedComplaint && (
          <>
            <DialogTitle sx={{ fontWeight: 800, color: '#1a237e', pb: 1 }}>Complaint Details</DialogTitle>
            <DialogContent dividers sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Type</Typography>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>{selectedComplaint.type.toUpperCase().replace('_', ' ')}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Date</Typography>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>{new Date(selectedComplaint.createdAt).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Description</Typography>
                  <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap', bgcolor: '#f8fafc', p: 2, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                    {selectedComplaint.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Location</Typography>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>{selectedComplaint.location?.address || 'Not provided'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>Status</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip 
                      label={selectedComplaint.status.toUpperCase()} 
                      color={selectedComplaint.status === 'resolved' ? 'success' : 'warning'} 
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
              <Button onClick={() => setSelectedComplaint(null)} sx={{ color: '#64748b', fontWeight: 600 }}>Close</Button>
              {selectedComplaint.status !== 'resolved' && (
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={() => handleResolve(selectedComplaint._id)}
                  sx={{ borderRadius: 2, fontWeight: 600, px: 3, boxShadow: '0 4px 14px 0 rgba(76, 175, 80, 0.39)' }}
                >
                  Mark as Resolved
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default BLODashboard