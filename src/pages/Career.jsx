import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { applyCareer, createCareer, fetchCareerApplications, fetchCareers } from '../services/api'

export default function Career({ user }) {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPostForm, setShowPostForm] = useState(false)
  const [careerData, setCareerData] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: ''
  })
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  })
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [careerApplications, setCareerApplications] = useState([])
  const [loadingApplications, setLoadingApplications] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadCareers = async () => {
      setLoading(true)
      try {
        const data = await fetchCareers()
        setCareers(data)
      } catch (err) {
        setMessage('Unable to load career openings.')
      } finally {
        setLoading(false)
      }
    }

    loadCareers()
  }, [])

  const handlePostCareer = async (e) => {
    e.preventDefault()
    try {
      const posted = await createCareer(careerData)
      setCareers([posted, ...careers])
      setCareerData({ title: '', location: '', type: 'Full-time', salary: '', description: '', requirements: '' })
      setShowPostForm(false)
      setMessage('Job posted successfully.')
    } catch (err) {
      setMessage('Unable to post job. Please log in as admin or employee.')
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()
    if (!selectedCareer) return
    try {
      await applyCareer(selectedCareer._id, applicationData)
      setMessage('Application submitted successfully.')
      setApplicationData({ name: '', email: '', phone: '', coverLetter: '' })
    } catch (err) {
      setMessage('Unable to submit application. Please try again later.')
    }
  }

  const loadApplications = async (career) => {
    if (!career) return
    setSelectedCareer(career)
    setLoadingApplications(true)
    try {
      const applications = await fetchCareerApplications(career._id)
      setCareerApplications(applications)
      setMessage('')
    } catch (err) {
      setMessage('Unable to load applications. Please try again later.')
      setCareerApplications([])
    } finally {
      setLoadingApplications(false)
    }
  }

  const handleSelectCareer = async (career) => {
    const isStaff = user?.role === 'admin' || user?.role === 'employee'
    if (isStaff) {
      await loadApplications(career)
    } else {
      setSelectedCareer(career)
      setCareerApplications([])
      setMessage('')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-3">Careers at Organic Hub</h1>
          <p className="text-gray-600 max-w-2xl">
            {user?.role === 'admin' ? 'Review applications and manage job listings.' : user?.role === 'employee' ? 'Post roles and review candidate applications.' : 'Browse open roles and apply to jobs that match your skills.'}
          </p>
        </div>
        {user?.role && (user.role === 'admin' || user.role === 'employee') && (
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="btn-primary"
          >
            {showPostForm ? 'Close Job Form' : 'Post New Job'}
          </button>
        )}
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-8">
          {message}
        </div>
      )}

      {showPostForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Post a New Career Opening</h2>
          <form onSubmit={handlePostCareer} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={careerData.title}
                onChange={(e) => setCareerData({ ...careerData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={careerData.location}
                onChange={(e) => setCareerData({ ...careerData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={careerData.type}
                onChange={(e) => setCareerData({ ...careerData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
              <input
                type="text"
                placeholder="Salary"
                value={careerData.salary}
                onChange={(e) => setCareerData({ ...careerData, salary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
              />
            </div>
            <textarea
              placeholder="Job Description"
              value={careerData.description}
              onChange={(e) => setCareerData({ ...careerData, description: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
            />
            <textarea
              placeholder="Requirements"
              value={careerData.requirements}
              onChange={(e) => setCareerData({ ...careerData, requirements: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
            />
            <button type="submit" className="btn-primary">Publish Job</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8">Loading jobs...</div>
        ) : careers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8">No open positions at the moment.</div>
        ) : careers.map((career) => (
          <div key={career._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-semibold">{career.title}</h2>
                <p className="text-gray-500">{career.location} • {career.type}</p>
              </div>
              <span className="text-sm text-green-700 bg-green-100 rounded-full px-3 py-1">{career.status}</span>
            </div>
            <p className="text-gray-600 mb-4">{career.description}</p>
            <p className="text-gray-700 mb-4"><span className="font-semibold">Requirements:</span> {career.requirements}</p>
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <span className="text-sm bg-gray-100 px-3 py-2 rounded">Salary: {career.salary}</span>
              {user ? (
                <button
                  onClick={() => handleSelectCareer(career)}
                  className="px-4 py-2 bg-organic-600 text-white rounded hover:bg-organic-700 transition-smooth"
                >
                  {user.role === 'admin' || user.role === 'employee' ? 'View Applications' : 'Apply Now'}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-organic-600 text-white rounded hover:bg-organic-700 transition-smooth"
                >Login to Apply</Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCareer && user && (user.role === 'admin' || user.role === 'employee') && (
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Applications for {selectedCareer.title}</h2>
          {loadingApplications ? (
            <p className="text-gray-600">Loading applications...</p>
          ) : careerApplications.length === 0 ? (
            <p className="text-gray-600">No applications have been received for this listing yet.</p>
          ) : (
            <div className="space-y-4">
              {careerApplications.map((application) => (
                <div key={application._id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-wrap justify-between gap-4 mb-3">
                    <div>
                      <p className="font-semibold">{application.name}</p>
                      <p className="text-sm text-gray-600">{application.email}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{new Date(application.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2"><span className="font-semibold">Phone:</span> {application.phone || '—'}</p>
                  <p className="text-gray-700"><span className="font-semibold">Cover Letter:</span> {application.coverLetter || 'No cover letter provided.'}</p>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setSelectedCareer(null)
              setCareerApplications([])
            }}
            className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-smooth"
          >Close</button>
        </div>
      )}

      {selectedCareer && (!user || user.role === 'customer') && (
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Apply for {selectedCareer.title}</h2>
          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={applicationData.name}
                onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={applicationData.email}
                onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={applicationData.phone}
              onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
            />
            <textarea
              placeholder="Cover Letter"
              value={applicationData.coverLetter}
              onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-organic-500"
            />
            <button type="submit" className="btn-primary">Submit Application</button>
            <button
              type="button"
              onClick={() => setSelectedCareer(null)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-smooth"
            >Cancel</button>
          </form>
        </div>
      )}

      <div className="text-center">
        <Link to="/" className="text-organic-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  )
}
