import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { login } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error,setError] = useState({
    email: '',
    password: '',
  });
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let errorAvailable = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email){
      setError((prev)=>({...prev,email:"Email is required"}));
      errorAvailable = true;
    }else if(!emailRegex.test(formData.email)){
            setError((prev)=>({...prev,email:"Invalid email format"}));
            errorAvailable = true;
    } else{
      setError((prev)=>({...prev,email:""}));
    }
    if(!formData.password){
        setError((prev)=>({...prev,password:"Password is required"}));
        errorAvailable = true;
    } else{
        setError((prev)=>({...prev,password:""}));
    }
    if(errorAvailable) return;

    // Set token immediately before navigating
    
    dispatch(login(formData))
    .then((res)=>{
        console.log("login response ;; ",res);
        // Navigate after setting token
        navigate('/dashboard')
    })
    .catch((err)=>{
        console.log("Login error:", err);
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="text"
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
              value={formData.password}
              name="password"
                onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {error.password && <div className="text-red-500 text-xs mt-1">{error.password}</div>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p> Already have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login