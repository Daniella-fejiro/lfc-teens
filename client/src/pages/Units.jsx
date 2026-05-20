import { motion } from "framer-motion"
import { Users, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Units() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const [unitsData, setUnitsData] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError("")

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/units`
        )

        if (!res.ok) {
          throw new Error("Failed to fetch service unit stats")
        }

        const data = await res.json()
        setUnitsData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const filtered = unitsData.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Units</h1>
        <p className="text-gray-500">
          Manage and view all church service units
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex items-center bg-white shadow rounded-lg px-3 py-2 w-full sm:w-1/2">
        <Search size={18} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search units..."
          className="ml-2 w-full outline-none"
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {loading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-xl p-5 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="mt-4 h-3 w-28 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : filtered.length > 0 ? (
          filtered.map((unit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow rounded-xl p-5 hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/workers?unit=${unit.name}`)}
            >
              {/* TITLE */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-navy">
                  {unit.name}
                </h2>

                <Users className="text-primary" />
              </div>

              {/* STATS */}
              <div className="mt-4 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">Total Members</span>
                  <span className="font-medium">{unit.total}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Active</span>
                  <span className="text-green-600 font-medium">
                    {unit.active}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Inactive</span>
                  <span className="text-red-600 font-medium">
                    {unit.inactive}
                  </span>
                </div>

              </div>

              {/* FOOTER */}
              <div className="mt-4 text-xs text-gray-400">
                Click to view members
              </div>

            </motion.div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow p-8 text-center">
            <Users size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="font-semibold text-gray-700">
              No units found
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your search
            </p>
          </div>
        )}

      </div>

    </div>
  )
}