'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface College {
  id: number
  name: string
  location: string
  state: string
  fees: number
  rating: number
  courses: string[]
  placement: number
  description: string
  established: number
}

export default function CollegeDetailPage() {
  const { id } = useParams()
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetch(`/api/colleges/${id}`)
      .then(r => r.json())
      .then(data => { setCollege(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-40 text-gray-500">Loading...</div>
  if (!college) return <div className="text-center py-40 text-red-500">College not found.</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-blue-600 hover:underline">← Back</Link>
          <h1 className="text-xl font-bold text-blue-700">🎓 CollegeFinder</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{college.name}</h2>
              <p className="text-gray-500">📍 {college.location}, {college.state}</p>
              <p className="text-gray-400 text-sm">Est. {college.established}</p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-2xl font-bold px-4 py-2 rounded-xl">
              ⭐ {college.rating}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-sm">Annual Fees</p>
              <p className="text-blue-700 font-bold text-xl">₹{college.fees.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-sm">Placement Rate</p>
              <p className="text-green-700 font-bold text-xl">{college.placement}%</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-sm">Courses Offered</p>
              <p className="text-purple-700 font-bold text-xl">{college.courses.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b">
            {['overview', 'courses', 'placements'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize ${activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{college.description}</p>
              </div>
            )}
            {activeTab === 'courses' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Courses Offered</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {college.courses.map(course => (
                    <div key={course} className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-blue-700 font-medium text-sm">
                      📚 {course}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'placements' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Placement Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Placement Rate</span>
                    <span className="font-bold text-green-600">{college.placement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${college.placement}%` }}></div>
                  </div>
                  <p className="text-gray-500 text-sm mt-4">
                    {college.placement >= 90
                      ? '🏆 Excellent placement record. Top companies recruit here.'
                      : college.placement >= 80
                      ? '✅ Good placement record with decent industry connections.'
                      : '📈 Decent placement, growing industry partnerships.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}