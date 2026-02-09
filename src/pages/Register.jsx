import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { login, register } from "../redux/userSlice"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errorAvailable = false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validate name
    if (!formData.name) {
      setError((prev) => ({ ...prev, name: "Name is required" }))
      errorAvailable = true
    } else if (formData.name.length < 2) {
      setError((prev) => ({ ...prev, name: "Name must be at least 2 characters" }))
      errorAvailable = true
    } else {
      setError((prev) => ({ ...prev, name: "" }))
    }

    // Validate email
    if (!formData.email) {
      setError((prev) => ({ ...prev, email: "Email is required" }))
      errorAvailable = true
    } else if (!emailRegex.test(formData.email)) {
      setError((prev) => ({ ...prev, email: "Invalid email format" }))
      errorAvailable = true
    } else {
      setError((prev) => ({ ...prev, email: "" }))
    }

    // Validate password
    if (!formData.password) {
      setError((prev) => ({ ...prev, password: "Password is required" }))
      errorAvailable = true
    } else {
      setError((prev) => ({ ...prev, password: "" }))
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: "Confirm Password is required" }))
      errorAvailable = true
    } else if (formData.password !== formData.confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
      errorAvailable = true
    } else {
      setError((prev) => ({ ...prev, confirmPassword: "" }))
    }

    if (errorAvailable) return

    // Dispatch register action
    dispatch(register(formData))
    .then((res)=>{
        if(res.payload.status){

            navigate('/dashboard')
        }
        console.log("Registration response:", res);
    })

    // fake register: store token in localStorage
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-2">Join us today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full name..."
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {error.name && <div className="text-red-500 text-xs mt-1">{error.name}</div>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email..."
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {error.email && <div className="text-red-500 text-xs mt-1">{error.email}</div>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {error.password && <div className="text-red-500 text-xs mt-1">{error.password}</div>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password..."
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {error.confirmPassword && <div className="text-red-500 text-xs mt-1">{error.confirmPassword}</div>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register