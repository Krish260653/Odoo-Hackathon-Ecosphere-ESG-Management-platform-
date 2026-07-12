import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './routes/ProtectedRoute'
import Layout from './components/layout/Layout'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Environmental from './pages/Environmental/Environmental'
import Social from './pages/Social/Social'
import Governance from './pages/Governance/Governance'
import Challenges from './pages/Challenges/Challenges'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import Reports from './pages/Reports/Reports'
import Admin from './pages/Admin/Admin'
import Profile from './pages/Profile/Profile'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Main Layout Protected Routes */}
          <Route 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/environmental" element={<Environmental />} />
            <Route path="/social" element={<Social />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
