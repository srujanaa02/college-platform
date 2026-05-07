'use client'
import { useState, useEffect } from 'react'
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
}

export default function HomePage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [search, setSearch] = useState('')
  const [state, setState] = useState('')
  const [maxFees, setMaxFees] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [compareList, setCompareList] = useState<number[]>([])

  const states = ['Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Rajasthan', 'West Bengal']

  async function fetchColleges() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page) })
      if (search) params.append('search', search)
      if (state) params.append('state', state)
      if (maxFees) params.append('maxFees', maxFees)

      const res = await fetch(`/api/colleges?${params}`)
      const data = await res.json()
      setColleges(data.colleges || [])
      setTotalPages(data.pages || 1)
    } catch {
      console.error('Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchColleges() }, [search, state, maxFees, page])

  function toggleCompare(id: number) {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">🎓 CollegeFinder</h1>
          <Link href="/compare" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Compare ({compareList.length}/3)
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Find Your College</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search college name..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={state}
              onChange={e => { setState(e.target.value); setPage(1) }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={maxFees}
              onChange={e => { setMaxFees(e.target.value); setPage(1) }}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Fees</option>
              <option value="100000">Under ₹1 Lakh</option>
              <option value="200000">Under ₹2 Lakhs</option>
              <option value="350000">Under ₹3.5 Lakhs</option>
              <option value="500000">Under ₹5 Lakhs</option>
            </select>
          </div>
        </div>

        {/* College Cards */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading colleges...</div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No colleges found. Try different filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map(college => (
              <div key={college.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800">{college.name}</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded">
                    ⭐ {college.rating}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">📍 {college.location}, {college.state}</p>
                <p className="text-blue-700 font-semibold mb-2">₹{college.fees.toLocaleString('en-IN')}/yr</p>
                <p className="text-green-600 text-sm mb-4">🎯 {college.placement}% placement</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {college.courses.slice(0, 3).map(c => (
                    <span key={c} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">{c}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link href={`/college/${college.id}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleCompare(college.id)}
                    className={`px-3 py-2 rounded-lg text-sm border ${compareList.includes(college.id)
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-600 hover:border-blue-400'}`}
                  >
                    {compareList.includes(college.id) ? '✓ Added' : '+ Compare'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg ${p === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'}`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}