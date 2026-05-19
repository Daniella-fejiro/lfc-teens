import { NavLink } from "react-router-dom"
import {
  Home,
  Users,
  Calendar,
  Settings,
  Layers,
  LogOut,
  X,
} from "lucide-react"
import { useEffect } from "react"

const links = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Workers", icon: Users, path: "/workers" },
  { name: "Units", icon: Layers, path: "/units" },
  { name: "Birthdays", icon: Calendar, path: "/birthdays" },
  { name: "Settings", icon: Settings, path: "/settings" },
]

export default function Sidebar({
  isOpen,
  setIsOpen,
  loading = false,
  logout,
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div
      className={`
        fixed lg:static top-0 left-0
        h-screen w-64
        bg-navy text-white
        flex flex-col
        z-50
        overflow-hidden
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="relative p-5 text-xl font-bold border-b border-white/10">
        Church DB

        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute right-4 top-4 p-2 rounded-lg hover:bg-white/10 transition"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-3 space-y-2 overflow-hidden">
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-lg bg-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          links.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-white/10 hover:translate-x-1"
                }`
              }
            >
              <link.icon size={18} />
              {link.name}
            </NavLink>
          ))
        )}
      </div>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={logout}
          className="
            flex items-center gap-3 w-full
            bg-red-600/10 hover:bg-red-600/20
            text-red-300 hover:text-white
            p-3 rounded-lg
            transition-all duration-200
            border border-red-500/20
          "
        >
          <LogOut size={18} />

          <div className="text-left">
            <p className="text-sm font-medium">Logout</p>
            <p className="text-xs text-red-300/70">
              Sign out of your account
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}