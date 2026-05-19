import { Menu } from "lucide-react"

export default function Navbar({ setIsOpen }) {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
      >
        <Menu />
      </button>

      <h1 className="font-semibold text-navy font-montserrat">LFC Teens Church Workers Database</h1>
    </div>
  )
}