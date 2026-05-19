import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2, Lock, Mail } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please enter email and password")
      setLoading(false)
      return
    }

    setTimeout(() => {
      navigate("/")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div
        className="
          w-full max-w-md
          bg-white rounded-2xl shadow-xl
          p-6 sm:p-8
        "
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy">
            Church DB
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className={`space-y-5 ${
            loading ? "pointer-events-none opacity-80" : ""
          }`}
        >
          <div>
            <label className="text-sm text-gray-600">
              Email Address
            </label>

            <div
              className="
                mt-1 flex items-center
                border rounded-lg px-3
                focus-within:border-primary
              "
            >
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full p-3 outline-none bg-transparent
                "
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <div
              className="
                mt-1 flex items-center
                border rounded-lg px-3
                focus-within:border-primary
              "
            >
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full p-3 outline-none bg-transparent
                "
              />
            </div>
          </div>

          {error && (
            <div
              className="
                bg-red-50 border border-red-200
                text-red-600 text-sm
                p-3 rounded-lg
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 rounded-lg
              text-white font-medium
              transition-all duration-200
              flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-primary/70 cursor-not-allowed"
                  : "bg-primary hover:opacity-90"
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}