import learnRoutes from "./routes/learnRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import express from "express"
import db from "./db/db.js"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

var corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === "production") {
      // In production, only allow requests from your production site
      if (origin === "https://mindstair.com") {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    } else {
      // In development, allow requests from localhost
      if (origin.startsWith("http://localhost")) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400, // The preflight response is cached for 24 hours
}
app.use(cors(corsOptions))

// Routes
app.use("/learn", learnRoutes)
app.use("/auth", authRoutes)
app.get("/", (req, res) => {
  res.send("Hello World!")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
