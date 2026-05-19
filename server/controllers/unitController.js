import Worker from "../models/Worker.js"

export const getServiceUnitStats = async (req, res) => {
  try {
    const workers = await Worker.find()

    const stats = {}

    workers.forEach((worker) => {
      const units = worker.serviceUnits || []

      units.forEach((unit) => {
        if (!stats[unit]) {
          stats[unit] = {
            name: unit,
            total: 0,
            active: 0,
            inactive: 0,
          }
        }

        stats[unit].total++

        if (worker.status === "Active") {
          stats[unit].active++
        } else {
          stats[unit].inactive++
        }
      })
    })

    return res.json(Object.values(stats))
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}