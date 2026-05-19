import Worker from "../models/Worker.js"

export const getBirthdays = async (req, res) => {
  try {
    const workers = await Worker.find()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const birthdayList = workers
      .filter((w) => w.dob)
      .map((w) => {
        const dob = new Date(w.dob)

        let nextBirthday = new Date(
          today.getFullYear(),
          dob.getMonth(),
          dob.getDate()
        )

        if (nextBirthday < today) {
          nextBirthday.setFullYear(today.getFullYear() + 1)
        }

        nextBirthday.setHours(0, 0, 0, 0)

        const daysAway = Math.ceil(
          (nextBirthday - today) /
            (1000 * 60 * 60 * 24)
        )

        return {
          _id: w._id,
          name:
            w.fullName ||
            `${w.firstName || ""} ${w.lastName || ""}`,

          date: nextBirthday,

          formattedDate: nextBirthday.toLocaleDateString(
            "en-GB",
            {
              weekday: "short",
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          ),

          monthDay: nextBirthday.toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "short",
            }
          ),

          unit: w.serviceUnits?.join(", ") || "No Unit",
          daysAway,
        }
      })
      .sort((a, b) => a.daysAway - b.daysAway)

    const todayBirthdays = birthdayList.filter(
      (b) => b.daysAway === 0
    )

    const thisWeek = birthdayList.filter(
      (b) => b.daysAway >= 0 && b.daysAway <= 7
    )

    const next30Days = birthdayList.filter(
      (b) => b.daysAway >= 0 && b.daysAway <= 30
    )

    res.json({
      today: todayBirthdays,
      thisWeek,
      next30Days,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}