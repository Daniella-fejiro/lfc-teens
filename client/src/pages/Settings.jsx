import { Save, Shield, Database, User, Bell } from "lucide-react"

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your church database preferences
        </p>
      </div>

      <div className="grid gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <div className="flex items-center gap-3 mb-5">
            <Database className="text-primary" size={22} />
            <h2 className="text-lg font-semibold">
              System Settings
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Church Name"
              className="border rounded-lg p-3 outline-none"
            />

            <input
              type="email"
              placeholder="Church Email"
              className="border rounded-lg p-3 outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <div className="flex items-center gap-3 mb-5">
            <Bell className="text-primary" size={22} />
            <h2 className="text-lg font-semibold">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span>Birthday Notifications</span>
              <input type="checkbox" />
            </label>

            <label className="flex items-center justify-between">
              <span>Email Alerts</span>
              <input type="checkbox" />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <div className="flex items-center gap-3 mb-5">
            <Shield className="text-primary" size={22} />
            <h2 className="text-lg font-semibold">
              Security & Data
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
              Backup Data
            </button>

            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
              Export Records
            </button>

            <button className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
              Reset System
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <div className="flex items-center gap-3 mb-5">
            <User className="text-primary" size={22} />
            <h2 className="text-lg font-semibold">
              Account
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="New Password"
              className="border rounded-lg p-3 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="border rounded-lg p-3 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="
              flex items-center gap-2
              bg-primary text-white
              px-5 py-3 rounded-lg
              hover:opacity-90 transition
            "
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}