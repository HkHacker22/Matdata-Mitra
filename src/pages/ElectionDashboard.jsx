import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import StatCard from '../components/dashboard/StatCard'
import SeatTally from '../components/dashboard/SeatTally'
import TurnoutChart from '../components/dashboard/TurnoutChart'

const electionData = {
  upcoming: [
    {
      id: 'E001',
      name: 'Delhi Assembly Elections',
      state: 'Delhi',
      date: '25 Feb 2025',
      seats: 70,
      phase: 'Single Phase',
      status: 'upcoming',
    },
    {
      id: 'E002',
      name: 'Maharashtra Assembly Elections',
      state: 'Maharashtra',
      date: '20 Nov 2024',
      seats: 288,
      phase: 'Multi Phase',
      status: 'upcoming',
    },
  ],
  ongoing: [
    {
      id: 'E003',
      name: 'Lok Sabha Elections',
      state: 'All India',
      date: '19 Apr 2024',
      seats: 543,
      phase: 'Phase 6 of 7',
      status: 'ongoing',
    },
  ],
  completed: [
    {
      id: 'E004',
      name: 'Assembly Elections 2023',
      state: 'Madhya Pradesh',
      date: '03 Dec 2023',
      seats: 230,
      phase: 'Single Phase',
      status: 'completed',
      result: {
        BJP: 163,
        INC: 66,
        BSP: 0,
        AAP: 0,
        OTHER: 1,
      },
      turnout: 72.5,
    },
    {
      id: 'E005',
      name: 'Assembly Elections 2023',
      state: 'Rajasthan',
      date: '25 Nov 2023',
      seats: 200,
      phase: 'Single Phase',
      status: 'completed',
      result: {
        INC: 69,
        BJP: 115,
        BSP: 2,
        AAP: 0,
        OTHER: 14,
      },
      turnout: 74.2,
    },
  ],
}

const stateWiseTurnout = [
  { state: 'Rajasthan', turnout: 74.2 },
  { state: 'Madhya Pradesh', turnout: 72.5 },
  { state: 'Chhattisgarh', turnout: 73.0 },
  { state: 'Telangana', turnout: 65.8 },
  { state: 'Mizoram', turnout: 81.0 },
]

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 2 }}>{children}</Box> : null
}

function ElectionDashboard() {
  const [tabValue, setTabValue] = useState(0)
  const [selectedElection, setSelectedElection] = useState(null)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const getStatusChip = (status) => {
    const chipStyles = {
      upcoming: { label: 'Upcoming', bgcolor: '#E3F2FD', color: '#1976D2' },
      ongoing: { label: 'Ongoing', bgcolor: '#E8F5E9', color: '#4CAF50' },
      completed: { label: 'Completed', bgcolor: '#ECEFF1', color: '#607D8B' },
    }
    const style = chipStyles[status] || chipStyles.upcoming
    return <Chip label={style.label} size="small" sx={{ bgcolor: style.bgcolor, color: style.color }} />
  }

  const renderElectionCard = (election) => (
    <Card
      key={election.id}
      sx={{
        cursor: 'pointer',
        border: selectedElection?.id === election.id ? '2px solid #FF9933' : '2px solid transparent',
        '&:hover': { boxShadow: 4 },
      }}
      onClick={() => setSelectedElection(election)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {election.name}
          </Typography>
          {getStatusChip(election.status)}
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2">{election.state}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <Typography variant="body2">{election.date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HowToVoteIcon fontSize="small" color="action" />
            <Typography variant="body2">{election.seats} Seats • {election.phase}</Typography>
          </Box>
        </Box>
        
        {election.turnout && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Voter Turnout: {election.turnout}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={election.turnout}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#000080' }}>
        Election Dashboard
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        This is a demonstration dashboard. Real election data would come from official Election Commission APIs.
      </Alert>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Elections"
            value="5"
            subtitle="Including all phases"
            icon="howToVote"
            color="#FF9933"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Seats Available"
            value="1,331"
            subtitle="Across all elections"
            icon="people"
            color="#000080"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Turnout"
            value="71.3%"
            subtitle="+2.5% vs last year"
            trend="up"
            trendValue="+2.5%"
            icon="trendingUp"
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Votes"
            value="45.2M"
            subtitle="Votes counted so far"
            icon="people"
            color="#9C27B0"
          />
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={`Upcoming (${electionData.upcoming.length})`} />
          <Tab label={`Ongoing (${electionData.ongoing.length})`} />
          <Tab label={`Completed (${electionData.completed.length})`} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {electionData.upcoming.map(renderElectionCard)}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {electionData.ongoing.map(renderElectionCard)}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {electionData.completed.map(renderElectionCard)}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <SeatTally
              title="Latest Results"
              seats={
                selectedElection?.result
                  ? Object.entries(selectedElection.result).map(([name, seats]) => ({
                      name,
                      seats,
                    }))
                  : [
                      { name: 'BJP', seats: 163 },
                      { name: 'INC', seats: 66 },
                      { name: 'OTHER', seats: 1 },
                    ]
              }
            />
          </Grid>
        </Grid>
      </TabPanel>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <TurnoutChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                State-wise Turnout
              </Typography>
              {stateWiseTurnout.map((item) => (
                <Box key={item.state} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.state}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#000080' }}>
                      {item.turnout}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.turnout}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': { bgcolor: '#000080', borderRadius: 4 },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="warning" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Integration Ready:</strong> The dashboard is designed to connect to real Election Commission APIs. Currently showing mock data for demonstration.
        </Typography>
      </Alert>
    </Box>
  )
}

export default ElectionDashboard