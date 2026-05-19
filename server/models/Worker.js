import mongoose from "mongoose"

const workerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    joinedYear: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      default: "Active",
      enum: ["Active", "Inactive"],
    },

    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    parentPhone: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      default: "Member",
      trim: true,
    },
    gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
    },

    serviceUnits: {
      type: [String],
      required: true,
      default: [],
    },
    workerId: {
    type: String,
    unique: true,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

workerSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName}`.trim()
})

workerSchema.virtual("age").get(function () {
  const today = new Date()
  const birth = new Date(this.dob)

  let age = today.getFullYear() - birth.getFullYear()

  const m = today.getMonth() - birth.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
})

workerSchema.set("toJSON", { virtuals: true })
workerSchema.set("toObject", { virtuals: true })

const Worker = mongoose.model("Worker", workerSchema)

export default Worker