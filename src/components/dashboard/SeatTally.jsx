import { Box, Typography, LinearProgress, Card, CardContent } from '@mui/material'

function SeatTally({ seats = [], title = 'Seat Tally' }) {
  const totalSeats = seats.reduce((sum, party) => sum + party.seats, 0)
  
  const partyColors = {
    BJP: '#FF9933',
    INC: '#138808',
    AAP: '#4CAF50',
    TMC: '#C62534',
    BRS: '#00A9E5',
    SP: '#E91E63',
    BSP: '#673AB7',
    NDA: '#FF6F00',
    UPA: '#00A651',
    OTHER: '#607D8B',
  }
  
  const getPartyColor = (partyName) => {
    const normalized = partyName.toUpperCase().replace(/[^A-Z]/g, '')
    return partyColors[normalized] || partyColors.OTHER
  }
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#000080' }}>
          {totalSeats}
          <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 1 }}>
            Total Seats
          </Typography>
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {seats.map((party) => (
            <Box key={party.name}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {party.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {party.seats}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={totalSeats > 0 ? (party.seats / totalSeats) * 100 : 0}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#E0E0E0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: getPartyColor(party.name),
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default SeatTally