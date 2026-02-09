import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import CreateTask from './pages/CreateTask'
import { getToken } from './common/tokenFunc'
import EditTask from './pages/EditTask'
import Home from './pages/Home'

// Protected Route Component
const IsAuthenticated = ({ children }) => {
  const token = getToken()
  console.log("IsAuthenticated token:", token)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}



// Protected routes array
const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/tasks', element: <Tasks /> },
  { path: '/create-task', element: <CreateTask /> },
  { path: '/edit-task/:id', element: <EditTask /> }
]

function App() {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const location = useLocation()
  const hideHeader = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div>
      <Header hideHeader={hideHeader} logout={logout} />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <IsAuthenticated>
                  {route.element}
                </IsAuthenticated>
              }
            />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default App

// Wrapper component with BrowserRouter
export function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}