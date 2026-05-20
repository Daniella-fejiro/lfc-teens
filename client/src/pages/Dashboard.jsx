import { motion } from "framer-motion"
import { Users, UserCheck, UserX, Layers, Cake } from "lucide-react"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const [thisWeekBirthdays, setThisWeekBirthdays] = useState([])
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([])
  const [todayBirthdays, setTodayBirthdays] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/stats`
        )

        const data = await res.json()

        setStats([
          {
            title: "Total Workers",
            value: data.totalWorkers,
            icon: Users,
            color: "bg-primary",
          },
          {
            title: "Active Workers",
            value: data.activeWorkers,
            icon: UserCheck,
            color: "bg-green-600",
          },
          {
            title: "Inactive Workers",
            value: data.inactiveWorkers,
            icon: UserX,
            color: "bg-red-600",
          },
          {
            title: "Total Units",
            value: data.totalUnits,
            icon: Layers,
            color: "bg-gold",
          },
        ])
      } catch (err) {
        console.log(err)
      }
    }

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

    fetchStats()
    fetchBirthdays()
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-navy">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">
          Welcome back to your church management system
        </p>
      </motion.div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-7 w-14 bg-gray-200 rounded"></div>
                  </div>

                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))
          : stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
              >
                <div>
                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-2xl font-bold text-navy">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`${item.color} p-3 rounded-full text-white`}
                >
                  <item.icon size={20} />
                </div>
              </motion.div>
            ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 rounded-xl shadow"
      >
        <div className="flex items-center gap-2 mb-4">
          <Cake className="text-primary" />

          <h2 className="text-lg font-semibold text-navy">
            Upcoming Birthdays
          </h2>
        </div>

        <div className="space-y-3">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-2 animate-pulse"
              >
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : upcomingBirthdays.length > 0 ? (
            upcomingBirthdays.map((b, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-2"
              >
                <p className="text-gray-700">
                  {b.name}
                </p>

                <span className="text-sm text-gray-500">
                  {b.formattedDate}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No upcoming birthdays
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}