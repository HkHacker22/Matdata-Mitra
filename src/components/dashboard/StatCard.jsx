import { Box, Typography, Card, CardContent } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import PeopleIcon from '@mui/icons-material/People'
import HowToVoteIcon from '@mui/icons-material/HowToVote'

const iconMap = {
  trendingUp: TrendingUpIcon,
  trendingDown: TrendingDownIcon,
  people: PeopleIcon,
  howToVote: HowToVoteIcon,
}

function StatCard({ title, value, subtitle, trend, trendValue, icon = 'people', color = '#FF9933' }) {
  const IconComponent = iconMap[icon] || PeopleIcon
  
  return (
    <Card
      sx={{
        borderLeft: `4px solid ${color}`,
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-2px)' },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 0.5 }}>
                {trend === 'up' ? (
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16, color: '#D32F2F' }} />
                )}
                <Typography
                  variant="caption"
                  sx={{ color: trend === 'up' ? '#4CAF50' : '#D32F2F', fontWeight: 600 }}
                >
                  {trendValue}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: `${color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconComponent sx={{ color, fontSize: 24 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default StatCard