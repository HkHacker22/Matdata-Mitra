import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Tabs,
  Tab,
  Chip,
  Badge,
  Divider,
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import WarningIcon from '@mui/icons-material/Warning'
import InfoIcon from '@mui/icons-material/Info'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import notificationService from '../services/notificationService'

const typeIcons = {
  election: HowToVoteIcon,
  complaint: WarningIcon,
  system: InfoIcon,
  reminder: NotificationsIcon,
}

const priorityColors = {
  high: '#D32F2F',
  medium: '#FF9933',
  low: '#607D8B',
}

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 2 }}>{children}</Box> : null
}

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
    
    const unsubscribe = notificationService.subscribe((data) => {
      setNotifications(data)
    })
    
    return () => unsubscribe()
  }, [])

  const loadNotifications = async () => {
    setLoading(true)
    try {
      const data = await notificationService.getNotifications()
      setNotifications(data)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId) => {
    await notificationService.markAsRead(notificationId)
  }

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead()
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const then = new Date(timestamp)
    const diffMs = now - then
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  const getTypeIcon = (type) => {
    const Icon = typeIcons[type] || InfoIcon
    return <Icon />
  }

  const filteredNotifications = () => {
    switch (tabValue) {
      case 1:
        return notifications.filter((n) => !n.read)
      case 2:
        return notifications.filter((n) => n.priority === 'high')
      default:
        return notifications
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const highPriorityCount = notifications.filter((n) => n.priority === 'high').length

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000080' }}>
          Notifications
        </Typography>
        {unreadCount > 0 && (
          <Button
            variant="outlined"
            startIcon={<MarkEmailReadIcon />}
            onClick={handleMarkAllAsRead}
            sx={{ borderColor: '#000080', color: '#000080' }}
          >
            Mark all as read
          </Button>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label={`All (${notifications.length})`} />
          <Tab 
            label={
              <Badge badgeContent={unreadCount} color="error">
                Unread
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge badgeContent={highPriorityCount} color="warning">
                Important
              </Badge>
            } 
          />
        </Tabs>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {filteredNotifications().length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <NotificationsIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You're all caught up! Check back later for updates.
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {filteredNotifications().map((notification, index) => (
                <Box key={notification.id}>
                  <ListItem
                    sx={{
                      bgcolor: notification.read ? 'transparent' : 'rgba(255, 153, 51, 0.05)',
                      '&:hover': { bgcolor: '#f5f5f5' },
                      cursor: 'pointer',
                    }}
                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                    secondaryAction={
                      !notification.read && (
                        <IconButton edge="end" size="small">
                          <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                        </IconButton>
                      )
                    }
                  >
                    <ListItemIcon
                      sx={{
                        color: priorityColors[notification.priority] || '#607D8B',
                        minWidth: 40,
                      }}
                    >
                      {getTypeIcon(notification.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: notification.read ? 400 : 600 }}
                          >
                            {notification.title}
                          </Typography>
                          <Chip
                            label={notification.priority}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              bgcolor: priorityColors[notification.priority],
                              color: 'white',
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {getTimeAgo(notification.timestamp)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredNotifications().length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Notifications