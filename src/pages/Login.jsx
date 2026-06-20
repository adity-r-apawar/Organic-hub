import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (formData.email === 'admin@organic.com' && formData.password === 'admin123') {
        onLogin({
          id: 1,
          name: 'Admin User',
          email: formData.email,
          role: 'admin'
        })
      } else if (formData.email && formData.password) {
        onLogin({
          id: 2,
          name: 'John Doe',
          email: formData.email,
          role: 'customer'
        })
      } else {
        setError('Please enter both email and password')
        setLoading(false)
        return
      }

      navigate('/')
    } catch (err) {
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">Sign in to your Organic Hub account</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-organic-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-600">Remember me</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2 text-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-organic-600 hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-xs text-gray-500 mb-3 font-semibold">Demo Credentials:</p>
          <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-3 rounded">
            <p><span className="font-medium">Admin:</span></p>
            <p>Email: admin@organic.com</p>
            <p>Password: admin123</p>
            <p className="mt-3"><span className="font-medium">Customer:</span></p>
            <p>Any email and password combination</p>
          </div>
        </div>
      </div>
    </div>
  )
}
