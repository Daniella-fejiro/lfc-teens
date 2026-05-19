import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Eye, Edit, Plus } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"

export default function Workers() {

  const [workers, setWorkers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // ✅ ADDED: read unit from URL
  const [searchParams] = useSearchParams()
  const unitFilter = searchParams.get("unit")

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true)
        setError("")

        const res = await fetch(`${import.meta.env.VITE_API_URL}/workers`)
        const data = await res.json()

        setWorkers(data)
      } catch (error) {
        console.log(error)
        setError("Failed to load workers")
      } finally {
        setLoading(false)
      }
    }

    fetchWorkers()
  }, [])

  // ✅ MODIFIED ONLY: added unit filter, kept your logic intact
  const filtered = workers
    .filter((w) =>
      w.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      w.workerId?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((w) => {
      if (!unitFilter) return true
      return w.serviceUnits?.includes(unitFilter)
    })

  return (
    <div className="space-y-5">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">

        <div>
          <h1 className="text-2xl font-bold text-navy">
            Workers
          </h1>
          <p className="text-gray-500">
            Manage all church workers
          </p>
        </div>

        <button
          onClick={() => navigate("/workers/create")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={18} />
          Create Worker
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">

        <div className="flex items-center bg-white shadow rounded-lg px-3 py-2 w-full sm:w-1/2">
          <Search size={18} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
            className="ml-2 w-full outline-none"
          />
        </div>

        <button className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Optional UI hint (does not affect logic) */}
      {unitFilter && (
        <div className="text-sm text-gray-500">
          Filtering by unit: <span className="font-medium">{unitFilter}</span>
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">

          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Units</th>
                <th className="p-3">Status</th>
                <th className="p-3">Year</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((w, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 text-sm">{w.workerId}</td>

                  <td className="p-3 font-medium text-navy">
                    {w.fullName}
                  </td>

                  <td className="p-3">{w.phone}</td>

                  <td className="p-3 text-sm">
                    {w.serviceUnits?.join(", ")}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        w.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {w.status}
                    </span>
                  </td>

                  <td className="p-3">{w.joinedYear}</td>

                  <td className="p-3">
                    <div className="flex gap-3">

                      <button
                        className="flex items-center gap-1 text-primary text-sm"
                        onClick={() => navigate(`/workers/${w._id}`)}
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        onClick={() => navigate(`/workers/edit/${w._id}`)}
                        className="flex items-center gap-1 text-gray-600 text-sm hover:scale-105 transition"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                    </div>
                  </td>

                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE CARDS */}
      {!loading && !error && (
        <div className="md:hidden space-y-3">

          {filtered.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow rounded-xl p-4 space-y-2"
            >

              <div className="flex justify-between items-center">
                <h2 className="font-bold text-navy">{w.fullName}</h2>

                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    w.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {w.status}
                </span>
              </div>

              <p className="text-sm text-gray-500">{w.workerId}</p>
              <p className="text-sm">{w.phone}</p>

              <p className="text-sm">
                {w.serviceUnits?.join(", ")}
              </p>

              <div className="flex gap-4 pt-2">

                <button
                  className="flex items-center gap-1 text-primary text-sm"
                  onClick={() => navigate(`/workers/${w._id}`)}
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() => navigate(`/workers/edit/${w._id}`)}
                  className="flex items-center gap-1 text-gray-600 text-sm hover:scale-105 transition"
                >
                  <Edit size={16} />
                  Edit
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      )}

    </div>
  )
}