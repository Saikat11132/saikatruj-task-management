import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ hideHeader, logout }) => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (hideHeader) return null

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/tasks', label: 'Tasks' },
    // { to: '/login', label: 'Login' },
    // { to: '/register', label: 'Register' },
  ]

  return (
    <header className=" bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg p-4 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link className="text-2xl font-bold text-white hover:text-blue-100 transition" to="/">
          TaskApp
        </Link>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 items-center flex-wrap">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition font-medium py-2 px-3 rounded-lg ${
                isActive(link.to)
                  ? 'bg-white text-blue-600 font-bold'
                  : 'text-white hover:bg-blue-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-blue-700 rounded-lg p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-3 rounded-lg transition font-medium ${
                isActive(link.to)
                  ? 'bg-white text-blue-600 font-bold'
                  : 'text-white hover:bg-blue-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              logout()
              setMobileMenuOpen(false)
            }}
            className="w-full text-left bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}

export default Header