import Worker from "../models/Worker.js"

export const createWorker = async (req, res) => {
  try {
    const lastWorker = await Worker.findOne({})
      .sort({ createdAt: -1 })
      .select("workerId")

    let newNumber = 1

    if (lastWorker?.workerId) {
      const lastNumber = parseInt(
        lastWorker.workerId.split("/").pop(),
        10
      )

      newNumber = lastNumber + 1
    }

    const formattedNumber = String(newNumber).padStart(4, "0")
    const workerId = `TC/WK/${formattedNumber}`

    const worker = await Worker.create({
      ...req.body,
      workerId,
    })

    res.status(201).json(worker)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 })
    res.status(200).json(workers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id)

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" })
    }

    res.status(200).json(worker)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" })
    }

    res.json(worker)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params

    const worker = await Worker.findByIdAndDelete(id)

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Worker deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}