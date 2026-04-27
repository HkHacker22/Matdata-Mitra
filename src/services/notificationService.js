const NOTIFICATION_ENDPOINTS = {
  LIST: '/notifications',
  READ: '/notifications/:id/read',
  READ_ALL: '/notifications/read-all',
  SUBSCRIBE: '/notifications/subscribe',
  PREFERENCES: '/notifications/preferences',
}

class NotificationService {
  constructor() {
    this.listeners = []
    this.notifications = []
  }

  async getNotifications() {
    await this.simulateDelay(300)
    return this.notifications
  }

  async markAsRead(notificationId) {
    await this.simulateDelay(200)
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.notifyListeners()
    }
    return { success: true }
  }

  async markAllAsRead() {
    await this.simulateDelay(300)
    this.notifications.forEach((n) => (n.read = true))
    this.notifyListeners()
    return { success: true }
  }

  subscribe(callback) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback)
    }
  }

  notifyListeners() {
    this.listeners.forEach((callback) => callback(this.notifications))
  }

  simulateDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  addNotification(notification) {
    this.notifications.unshift({
      id: `N${Date.now()}`,
      read: false,
      timestamp: new Date().toISOString(),
      ...notification,
    })
    this.notifyListeners()
  }

  clearAll() {
    this.notifications = []
    this.notifyListeners()
  }
}

const mockNotifications = [
  {
    id: 'N001',
    type: 'election',
    title: 'Election Day Reminder',
    message: 'Delhi Assembly Elections are scheduled for tomorrow. Don\'t forget to vote!',
    read: false,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    priority: 'high',
  },
  {
    id: 'N002',
    type: 'system',
    title: 'Voter Slip QR Code Generated',
    message: 'Your voter slip QR code has been generated successfully. Download from your profile.',
    read: false,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    priority: 'medium',
  },
  {
    id: 'N003',
    type: 'complaint',
    title: 'Complaint Status Update',
    message: 'Your complaint regarding water facility has been escalated to the district collector.',
    read: true,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    priority: 'low',
  },
  {
    id: 'N004',
    type: 'election',
    title: 'Polling Hours Extended',
    message: 'Polling hours extended by 2 hours in some constituencies due to heavy turnout.',
    read: true,
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    priority: 'high',
  },
  {
    id: 'N005',
    type: 'system',
    title: 'New Feature Available',
    message: 'Check out the new Election Dashboard with real-time updates!',
    read: true,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    priority: 'medium',
  },
]

const notificationService = new NotificationService()
notificationService.notifications = mockNotifications

export { notificationService }
export default notificationService