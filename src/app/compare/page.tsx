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
  established: number
}

export default function ComparePage() {
  const [allColleges, setAllColleges] = useState<College[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [compared, setCompared] = useState<College[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/colleges?page=1')
      .then(r => r.json())
      .then(data => setAllColleges(data.colleges || []))
  }, [])

  async function handleCompare() {
    if (selected.length < 2) return alert('Select at least 2 colleges')
    setLoading(true)
    const res = await fetch(`/api/colleges/compare?ids=${selected.join(',')}`)
    const data = await res.json()
    setCompared(data)
    setLoading(false)
  }

  function toggleSelect(id: number) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev)
  }

  const metrics = [
    { key: 'location', label: '📍 Location', format: (c: College) => `${c.location}, ${c.state}` },
    { key: 'fees', label: '💰 Annual Fees', format: (c: College) => `₹${c.fees.toLocaleString('en-IN')}` },
    { key: 'rating', label: '⭐ Rating', format: (c: College) => `${c.rating}/5.0` },
    { key: 'placement', label: '🎯 Placement', format: (c: College) => `${c.placement}%` },
    { key: 'courses', label: '📚 Courses', format: (c: College) => c.courses.join(', ') },
    { key: 'established', label: '🏛️ Established', format: (c: College) => String(c.established) },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-blue-600 hover:underline">← Back to Search</Link>
          <h1 className="text-xl font-bold text-blue-700">⚖️ Compare Colleges</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">Select 2–3 colleges to compare</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {allColleges.map(c => (
              <button key={c.id} onClick={() => toggleSelect(c.id)}
                className={`text-left p-3 rounded-lg border text-sm transition-colors ${selected.includes(c.id)
                  ? 'bg-blue-100 border-blue-500 text-blue-800 font-medium'
                  : 'border-gray-200 text-gray-700 hover:border-blue-300'}`}>
                {selected.includes(c.id) ? '✓ ' : ''}{c.name}
              </button>
            ))}
          </div>
          <button onClick={handleCompare} disabled={selected.length < 2 || loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700">
            {loading ? 'Comparing...' : 'Compare Now →'}
          </button>
        </div>

        {/* Comparison Table */}
        {compared.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 text-gray-500 font-medium w-36">Criteria</th>
                  {compared.map(c => (
                    <th key={c.id} className="text-center p-4 text-blue-700 font-bold">{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((m, i) => (
                  <tr key={m.key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 text-gray-600 text-sm font-medium">{m.label}</td>
                    {compared.map(c => {
                      const val = m.format(c)
                      const isNumeric = m.key === 'fees' || m.key === 'rating' || m.key === 'placement'
                      const numVals = compared.map(x => m.key === 'fees' ? x.fees : m.key === 'rating' ? x.rating : x.placement)
                      const isBest = isNumeric && (m.key === 'fees'
                        ? Number(c[m.key as keyof College]) === Math.min(...numVals)
                        : Number(c[m.key as keyof College]) === Math.max(...numVals))
                      return (
                        <td key={c.id} className={`p-4 text-center text-sm ${isBest ? 'text-green-700 font-bold' : 'text-gray-700'}`}>
                          {isBest ? '🏆 ' : ''}{val}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}