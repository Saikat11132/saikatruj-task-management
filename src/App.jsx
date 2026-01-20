import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

// Simple token check using localStorage
export const isAuthenticated = () => Boolean(localStorage.getItem('token'))

// Minimal page components (kept inline for simplicity)
const Home = () => (
  <div>
    <h1>Smart Task Management</h1>
    <p>Simple frontend router demo.</p>
  </div>
)

const Login = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    // fake login: store token in localStorage
    localStorage.setItem('token', 'demo-token')
    navigate('/dashboard')
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input defaultValue="user@example.com" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" defaultValue="password" />
        </div>
        <button type="submit">Login (sets demo token)</button>
      </form>
    </div>
  )
}

const Register = () => (
  <div>
    <h2>Register</h2>
    <p>Use API-backed register in your real app; this is a placeholder.</p>
  </div>
)



const Tasks = () => (
  <div>
    <h2>Tasks</h2>
    <p>List of user tasks (protected).</p>
  </div>
)

// Define routes and whether they're protected
const routes = [
  { path: '/', element: <Home />, protected: false },
  { path: '/login', element: <Login />, protected: false },
  { path: '/register', element: <Register />, protected: false },
  { path: '/dashboard', element: <Dashboard />, protected: true },
  { path: '/tasks', element: <Tasks />, protected: true },
]

// Export a helper to get available routes based on token
export function getAvailableRoutes() {
  return routes.filter((r) => !r.protected || isAuthenticated())
}

function App() {
  const logout = () => {
    localStorage.removeItem('token')
    // reload to update nav / routing
    window.location.reload()
  }

  return (
    <BrowserRouter>
      <header style={{ padding: 12 }}>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/tasks">Tasks</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <button onClick={logout}>Logout</button>
      </header>

      <main style={{ padding: 12 }}>
        <Routes>
          {routes.map((r) => (
            <Route
              key={r.path}
              path={r.path}
              element={r.protected && !isAuthenticated() ? <Navigate to="/login" replace /> : r.element}
            />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
