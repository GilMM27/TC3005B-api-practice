import "dotenv/config"
import express from "express"
import morgan from "morgan"
import indexRoutes from "./routes/index.routes.js"
import userRoutes from "./routes/users.routes.js"
import loginRoutes from "./routes/login.routes.js"
import connectDB from "./utils/db.js"

connectDB()

const app = express()

app.use(morgan("dev"))
app.use(indexRoutes)
app.use(userRoutes)
app.use(loginRoutes)
app.listen(3000)
