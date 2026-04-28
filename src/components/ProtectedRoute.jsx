import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

/**
 * ProtectedRoute component - guards sensitive routes.
 * Checks for authToken and optionally a required role.
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const location = useLocation()
  const token = localStorage.getItem('authToken')
  const userRole = localStorage.getItem('userRole')

  // 1. Check if user is logged in
  if (!token) {
    // Redirect to login but save the current location they were trying to go to
    // If they were trying to go to blo-dashboard, send them to blo-login
    const redirectPath = location.pathname.includes('blo') ? '/blo-login' : '/login'
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  // 2. Check for role-based access
  if (requiredRole && userRole !== requiredRole) {
    // If they are logged in but don't have the right role, send them home
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
