import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

export default function SidebarLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 overflow-hidden">

        <Navbar setIsOpen={setIsOpen} />

        {/* ONLY THIS SCROLLS */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

      </div>
    </div>
  )
}