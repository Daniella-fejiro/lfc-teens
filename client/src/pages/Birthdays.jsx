import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Cake,
  CalendarDays,
  Gift,
  Loader2,
} from "lucide-react"

export default function Birthdays() {
  const [search, setSearch] = useState("")
  const [thisWeekBirthdays, setThisWeekBirthdays] = useState([])
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([])
  const [todayBirthdays, setTodayBirthdays] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        setLoading(true)
        setError("")

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/birthdays`
        )

        if (!res.ok) {
          throw new Error("Failed to fetch birthdays")
        }

        const data = await res.json()

        setTodayBirthdays(data.today || [])
        setThisWeekBirthdays(data.thisWeek || [])
        setUpcomingBirthdays(data.next30Days || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBirthdays()
  }, [])

  const filtered = upcomingBirthdays.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-navy">
          Birthdays
        </h1>
        <p className="text-gray-500">
          Manage and track workers birthdays
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-white rounded-xl shadow p-10 flex flex-col items-center justify-center gap-3">
          <Loader2
            size={30}
            className="animate-spin text-primary"
          />
          <p className="text-gray-500">
            Loading birthdays...
          </p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
          {error}
        </div>
      )}

      {/* CONTENT */}
      {!loading && !error && (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-white shadow-sm border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Cake size={18} />
                <p className="text-sm text-gray-500">
                  This Month
                </p>
              </div>

              <h2 className="text-3xl font-bold text-navy">
                {upcomingBirthdays.length}
              </h2>
            </div>

            <div className="bg-white shadow-sm border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2 text-green-600">
                <CalendarDays size={18} />
                <p className="text-sm text-gray-500">
                  This Week
                </p>
              </div>

              <h2 className="text-3xl font-bold text-navy">
                {thisWeekBirthdays.length}
              </h2>
            </div>

            <div className="bg-white shadow-sm border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2 text-red-600">
                <Gift size={18} />
                <p className="text-sm text-gray-500">
                  Today
                </p>
              </div>

              <h2 className="text-3xl font-bold text-navy">
                {todayBirthdays.length}
              </h2>
            </div>

          </div>

          {/* SEARCH */}
          <div className="bg-white shadow-sm border rounded-xl px-4 py-3 flex items-center gap-2 w-full sm:w-1/2">
            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search birthday name..."
              className="w-full outline-none text-sm"
            />
          </div>

          {/* UPCOMING BIRTHDAYS */}
          <div className="bg-white shadow-sm border rounded-xl p-5">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-navy">
                Upcoming Birthdays
              </h2>

              <span className="text-sm text-gray-400">
                {filtered.length} found
              </span>
            </div>

            <div className="space-y-3">

              {filtered.length > 0 ? (
                filtered.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="flex items-center justify-between border-b last:border-0 pb-3"
                  >

                    <div>
                      <p className="font-medium text-navy">
                        {b.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {b.unit}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">
                        {b.formattedDate}
                      </p>
                    </div>

                  </motion.div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  No birthdays found
                </div>
              )}

            </div>

          </div>
        </>
      )}
    </div>
  )
}