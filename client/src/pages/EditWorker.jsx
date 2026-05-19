import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import Modal from "../components/Modal"

export default function EditWorker() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    gender: "",
    dob: "",
    parentName: "",
    parentPhone: "",
    position: "",
    joinedYear: "",
    status: "Active",
    notes: "",
    serviceUnits: "",
  })

  const [isDirty, setIsDirty] = useState(false)

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    actions: [],
  })

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/workers/${id}`
        )

        const data = await res.json()

        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          middleName: data.middleName || "",
          phone: data.phone || "",
          gender: data.gender || "",
          dob: data.dob || "",
          parentName: data.parentName || "",
          parentPhone: data.parentPhone || "",
          position: data.position || "",
          joinedYear: data.joinedYear || "",
          status: data.status || "Active",
          notes: data.notes || "",
          serviceUnits: data.serviceUnits?.join(", ") || "",
        })
      } catch (err) {
        setModal({
          open: true,
          title: "Error",
          message: "Failed to load worker data",
          actions: [
            {
              label: "Retry",
              variant: "primary",
              onClick: () => window.location.reload(),
            },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWorker()
  }, [id])

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isDirty) return
      e.preventDefault()
      e.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isDirty])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setIsDirty(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)

      const payload = {
        ...form,
        serviceUnits: form.serviceUnits
          .split(",")
          .map((u) => u.trim())
          .filter(Boolean),
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workers/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) throw new Error("Update failed")

      setIsDirty(false)

      setModal({
        open: true,
        title: "Success",
        message: "Worker updated successfully",
        actions: [
          {
            label: "OK",
            variant: "primary",
            onClick: () => {
              setModal((prev) => ({ ...prev, open: false }))
              navigate(`/workers/${id}`)
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
              setModal((prev) => ({ ...prev, open: false })),
          },
        ],
      })
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => {
    if (!isDirty) {
      navigate(-1)
      return
    }

    setModal({
      open: true,
      title: "Unsaved Changes",
      message: "You have unsaved changes. Do you want to leave?",
      actions: [
        {
          label: "Leave",
          variant: "danger",
          onClick: () => navigate(-1),
        },
      ],
    })
  }

  if (loading)
    return <div className="p-5 text-gray-500">Loading worker...</div>

  const Input = ({ label, ...props }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-6"
    >
      <button
        onClick={handleBack}
        className="text-sm text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold">Edit Worker</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" name="firstName" value={form.firstName} />
          <Input label="Last Name" name="lastName" value={form.lastName} />
        </div>

        <Input label="Middle Name" name="middleName" value={form.middleName} />

        {/* ✅ DOB ADDED HERE */}
        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          value={form.dob}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Phone" name="phone" value={form.phone} />
          <Input label="Parent Phone" name="parentPhone" value={form.parentPhone} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <Input label="Parent Name" name="parentName" value={form.parentName} />
        <Input label="Position" name="position" value={form.position} />
        <Input label="Joined Year" name="joinedYear" value={form.joinedYear} />

        <Input
          label="Service Units"
          name="serviceUnits"
          value={form.serviceUnits}
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-24"
          />
        </div>

        <button
          disabled={saving}
          className="w-full bg-primary text-white p-2 rounded-md hover:opacity-90"
        >
          {saving ? "Updating..." : "Update Worker"}
        </button>
      </form>

      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onClose={() =>
          setModal((prev) => ({ ...prev, open: false }))
        }
        actions={modal.actions}
      />
    </motion.div>
  )
}