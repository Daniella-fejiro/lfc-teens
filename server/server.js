import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import workerRoutes from "./routes/workerRoutes.js"
import unitRoutes from './routes/unitRoutes.js'
import birthdayRoutes from './routes/birthdayRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/workers", workerRoutes)
app.use('/units', unitRoutes)
app.use('/birthdays', birthdayRoutes)

app.get("/", (req, res) => {
  res.send("helloooo")
})

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`)
})