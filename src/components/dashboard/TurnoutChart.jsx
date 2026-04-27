import { Box, Typography, Card, CardContent } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const mockData = [
  { phase: 'Phase 1', date: 'Mar 16', turnout: 65 },
  { phase: 'Phase 2', date: 'Mar 28', turnout: 68 },
  { phase: 'Phase 3', date: 'Apr 7', turnout: 72 },
  { phase: 'Phase 4', date: 'Apr 13', turnout: 70 },
  { phase: 'Phase 5', date: 'Apr 19', turnout: 69 },
  { phase: 'Phase 6', date: 'Apr 26', turnout: 71 },
]

function TurnoutChart({ data = mockData, title = 'Voter Turnout Trends' }) {
  const maxTurnout = Math.max(...data.map((d) => d.turnout))
  const minTurnout = Math.min(...data.map((d) => d.turnout))
  const avgTurnout = Math.round(data.reduce((sum, d) => sum + d.turnout, 0) / data.length)
  
  const getBarHeight = (value) => (value / 100) * 100
  
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
              Avg: {avgTurnout}%
            </Typography>
          </Box>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            height: 200,
            borderBottom: '2px solid #E0E0E0',
            pb: 1,
          }}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, mb: 0.5, color: '#000080' }}
              >
                {item.turnout}%
              </Typography>
              <Box
                sx={{
                  width: '60%',
                  height: `${getBarHeight(item.turnout)}%`,
                  bgcolor:
                    item.turnout === maxTurnout
                      ? '#4CAF50'
                      : item.turnout === minTurnout
                      ? '#FF9933'
                      : '#000080',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                  minHeight: 20,
                }}
              />
              <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
                {item.phase}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {item.date}
              </Typography>
            </Box>
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#4CAF50', borderRadius: 0.5 }} />
            <Typography variant="caption">Highest</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#000080', borderRadius: 0.5 }} />
            <Typography variant="caption">Average</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#FF9933', borderRadius: 0.5 }} />
            <Typography variant="caption">Lowest</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TurnoutChart