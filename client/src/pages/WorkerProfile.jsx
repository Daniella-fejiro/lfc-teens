import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Calendar,
  User,
} from "lucide-react"
import { useState, useEffect } from "react"
import Modal from "../components/Modal"

export default function WorkerProfile() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [worker, setWorker] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    actions: [],
  })

  const handleDelete = async () => {
    try {
      setSaving(true)

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workers/${id}`,
        {
          method: "DELETE",
        }
      )

      if (!res.ok) {
        throw new Error("Delete failed")
      }

      setModal({
        open: true,
        title: "Deleted",
        message: "Worker deleted successfully",
        actions: [
          {
            label: "OK",
            variant: "primary",
            onClick: () => {
              setModal((prev) => ({
                ...prev,
                open: false,
              }))
              navigate("/workers")
            },
          },
        ],
      })
    } catch (err) {
      setModal({
        open: true,
        title: "Error",
        message: err.message || "Something went wrong",
        actions: [
          {
            label: "Close",
            variant: "danger",
            onClick: () =>
              setModal((prev) => ({
                ...prev,
                open: false,
              })),
          },
        ],
      })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setLoading(true)
        setError("")

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/workers/${id}`
        )

        if (!res.ok) {
          throw new Error("Failed to fetch worker")
        }

        const data = await res.json()
        setWorker(data)
      } catch (error) {
        console.log(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorker()
  }, [id])

  const initials = `${worker?.firstName?.[0] || ""}${worker?.lastName?.[0] || ""}`

  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>

          <div className="flex gap-2">
            <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200"></div>

            <div className="space-y-2">
              <div className="h-5 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="p-3 border rounded-lg space-y-2"
              >
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          <div className="p-3 border rounded-lg space-y-2">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
        {error}
      </div>
    )
  }

  if (!worker) {
    return (
      <div className="text-center text-gray-500 py-10">
        Worker not found
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        actions={modal.actions}
         onClose={() =>
          setModal((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-navy transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(`/workers/edit/${worker._id}`)
            }
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={() =>
              setModal({
                open: true,
                title: "Confirm Delete",
                message:
                  "Are you sure you want to delete this worker? This action cannot be undone.",
                actions: [
                  {
                    label: saving
                      ? "Deleting..."
                      : "Delete",
                    variant: "danger",
                    onClick: handleDelete,
                  },
                ],
              })
            }
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 text-white hover:opacity-90 transition"
          >
            <Trash2 size={16} />
            {saving ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-xl p-5 space-y-5"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-navy font-bold text-xl">
              {initials}
            </div>

            <div>
              <h1 className="text-xl font-bold text-navy">
                {worker.fullName ||
                  `${worker.firstName || ""} ${worker.lastName || ""}`}
              </h1>

              <p className="text-gray-500">
                {worker.workerId}
              </p>

              <span
                className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                  worker.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {worker.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border rounded-lg">
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <Phone size={14} />
              Phone
            </p>
            <p className="font-medium">{worker.phone || "-"}</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <Calendar size={14} />
              Date of Birth
            </p>
            <p className="font-medium">
              {worker.dob
                ? new Date(worker.dob).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-gray-500 text-sm">Gender</p>
            <p className="font-medium">{worker.gender || "-"}</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-gray-500 text-sm">Age</p>
            <p className="font-medium">{worker.age || "-"}</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-gray-500 text-sm">
              Service Units
            </p>
            <p className="font-medium">
              {Array.isArray(worker.serviceUnits)
                ? worker.serviceUnits.join(", ")
                : worker.serviceUnits || "-"}
            </p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-gray-500 text-sm">
              Joined Year
            </p>
            <p className="font-medium">
              {worker.joinedYear || "-"}
            </p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-gray-500 text-sm">
              Parent Info
            </p>
            <p className="font-medium">
              {worker.parentName || "-"}
            </p>
            <p className="text-sm text-gray-500">
              {worker.parentPhone || "-"}
            </p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-gray-500 text-sm">
              Position
            </p>
            <p className="font-medium">
              {worker.position || "-"}
            </p>
          </div>

          <div className="p-3 border rounded-lg md:col-span-2">
            <p className="text-gray-500 text-sm">
              Created At
            </p>
            <p className="font-medium">
              {worker.createdAt
                ? new Date(worker.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        <div className="p-3 border rounded-lg">
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <User size={14} />
            Notes
          </p>

          <p className="text-sm">
            {worker.notes || "No notes available"}
          </p>
        </div>
      </motion.div>
    </div>
  )
}