import Worker from "../models/Worker.js"

export const getDashboardStats = async (req, res) => {
  try {
    const totalWorkers = await Worker.countDocuments()

    const activeWorkers = await Worker.countDocuments({
      status: "Active",
    })

    const inactiveWorkers = await Worker.countDocuments({
      status: "Inactive",
    })

    const workers = await Worker.find({}, "serviceUnits")

    const unitSet = new Set()

    workers.forEach((worker) => {
      if (
        worker.serviceUnits &&
        Array.isArray(worker.serviceUnits)
      ) {
        worker.serviceUnits.forEach((unit) => {
          if (unit?.trim()) {
            unitSet.add(unit.trim())
          }
        })
      }
    })

    const totalUnits = unitSet.size

    res.status(200).json({
      totalWorkers,
      activeWorkers,
      inactiveWorkers,
      totalUnits,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}