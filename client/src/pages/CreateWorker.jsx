import { useState } from "react"
import { motion } from "framer-motion"
import Modal from "../components/Modal"

export default function CreateWorker() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phone: "",
    dob: "",
    joinedYear: "",
    status: "Active",
    parentName: "",
    parentPhone: "",
    position: "",
    serviceUnits: "",
    notes: "",
  })

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    actions: [],
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formattedForm = {
      ...form,
      serviceUnits: form.serviceUnits
        .split(",")
        .map((unit) => unit.trim())
        .filter(Boolean),
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workers/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedForm),
        }
      )

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Something went wrong")
      }

      await res.json()

      setModal({
        open: true,
        title: "Success",
        message: "Worker created successfully",
        actions: [
          {
            label: "OK",
            variant: "primary",
            onClick: () => {
              setModal((prev) => ({ ...prev, open: false }))
            },
          },
        ],
      })

      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        phone: "",
        dob: "",
        joinedYear: "",
        status: "Active",
        parentName: "",
        parentPhone: "",
        position: "",
        serviceUnits: "",
        notes: "",
      })
    } catch (error) {
      setModal({
        open: true,
        title: "Error",
        message: error.message || "Something went wrong",
        actions: [
          {
            label: "Retry",
            variant: "danger",
            onClick: () => {
              setModal((prev) => ({ ...prev, open: false }))
            },
          },
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-navy">Create Worker</h1>
        <p className="text-gray-500">
          Add a new church worker to the system
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-5 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input"
          />

          <input
            name="middleName"
            value={form.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
            className="input"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input"
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="joinedYear"
            value={form.joinedYear}
            onChange={handleChange}
            placeholder="Joined Year (e.g 2024)"
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="parentName"
            value={form.parentName}
            onChange={handleChange}
            placeholder="Parent Name"
            className="input"
          />

          <input
            name="parentPhone"
            value={form.parentPhone}
            onChange={handleChange}
            placeholder="Parent Phone"
            className="input"
          />
        </div>

        <textarea
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Previous Position Held"
          className="input h-24"
        />

        <textarea
          name="serviceUnits"
          value={form.serviceUnits}
          onChange={handleChange}
          placeholder="Enter worker units (e.g Choir, Ushering, Media)"
          className="input h-24"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes (optional)"
          className="input h-20"
        />

        <div className="flex flex-col md:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() =>
              setModal({
                open: true,
                title: "Discard Changes?",
                message: "All unsaved data will be lost.",
                actions: [
                  {
                    label: "Discard",
                    variant: "danger",
                    onClick: () => window.history.back(),
                  },
                ],
              })
            }
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Worker"}
          </button>
        </div>
      </form>

      {/* MODAL */}
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