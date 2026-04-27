import { useState } from 'react'
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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import RefreshIcon from '@mui/icons-material/Refresh'

const bloStats = {
  totalVoters: 1250,
  verified: 980,
  pending: 270,
  complaints: 12,
}

const boothAssignments = [
  { id: 'B001', name: 'Govt. Senior Secondary School', voters: 450, verified: 380, pending: 70 },
  { id: 'B002', name: 'Community Center', voters: 320, verified: 290, pending: 30 },
  { id: 'B003', name: 'Municipal Primary School', voters: 480, verified: 310, pending: 170 },
]

const recentVerifications = [
  { id: 'V001', name: 'Rajesh Kumar', booth: 'B001', time: '10:30 AM', status: 'verified' },
  { id: 'V002', name: 'Priya Sharma', booth: 'B001', time: '10:25 AM', status: 'verified' },
  { id: 'V003', name: 'Amit Patel', booth: 'B002', time: '10:20 AM', status: 'pending' },
  { id: 'V004', name: 'Sunita Devi', booth: 'B003', time: '10:15 AM', status: 'verified' },
  { id: 'V005', name: 'Mohammad Rafiq', booth: 'B003', time: '10:10 AM', status: 'pending' },
]

const pendingComplaints = [
  { id: 'C001', title: 'Water facility not available', booth: 'B001', priority: 'high', time: '2 hours ago' },
  { id: 'C002', title: 'Missing voter list', booth: 'B003', priority: 'medium', time: '4 hours ago' },
]

function BLODashboard() {
  const [currentTab, setCurrentTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const getVerifiedPercentage = () => {
    return Math.round((bloStats.verified / bloStats.totalVoters) * 100)
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
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{bloStats.totalVoters}</Typography>
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
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{bloStats.verified}</Typography>
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
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{bloStats.pending}</Typography>
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
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{bloStats.complaints}</Typography>
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
            {bloStats.verified} of {bloStats.totalVoters} voters verified
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
              {pendingComplaints.map((complaint) => (
                <Box
                  key={complaint.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    bgcolor: complaint.priority === 'high' ? '#FFEBEE' : '#FFF3E0',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{complaint.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {complaint.booth} • {complaint.time}
                    </Typography>
                  </Box>
                  <Chip
                    label={complaint.priority}
                    size="small"
                    color={complaint.priority === 'high' ? 'error' : 'warning'}
                  />
                </Box>
              ))}
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
                {recentVerifications.map((voter) => (
                  <TableRow key={voter.id}>
                    <TableCell>{voter.id}</TableCell>
                    <TableCell>{voter.name}</TableCell>
                    <TableCell>{voter.booth}</TableCell>
                    <TableCell>{voter.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={voter.status}
                        size="small"
                        color={voter.status === 'verified' ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <CheckCircleIcon color="success" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
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
    </Box>
  )
}

export default BLODashboard