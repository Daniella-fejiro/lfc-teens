import { motion } from "framer-motion"
import { Users, UserCheck, UserX, Layers, Cake } from "lucide-react"

const stats = [
  {
    title: "Total Workers",
    value: 120,
    icon: Users,
    color: "bg-primary",
  },
  {
    title: "Active Workers",
    value: 98,
    icon: UserCheck,
    color: "bg-green-600",
  },
  {
    title: "Inactive Workers",
    value: 22,
    icon: UserX,
    color: "bg-red-600",
  },
  {
    title: "Total Units",
    value: 8,
    icon: Layers,
    color: "bg-gold",
  },
]

const birthdays = [
  { name: "John Doe", date: "May 15" },
  { name: "Sarah Paul", date: "May 16" },
  { name: "Michael Peter", date: "May 18" },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
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

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold text-navy">
                {item.value}
              </h2>
            </div>

            <div className={`${item.color} p-3 rounded-full text-white`}>
              <item.icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* BIRTHDAYS SECTION */}
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
          {birthdays.map((b, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-2"
            >
              <p className="text-gray-700">{b.name}</p>
              <span className="text-sm text-gray-500">{b.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}