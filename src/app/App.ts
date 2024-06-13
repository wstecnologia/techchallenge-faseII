import dotenv from "dotenv"
dotenv.config()

import express from "express"
import bodyParser from "body-parser"
import swaggerUi from "swagger-ui-express"
import { allRoutes } from "./routes/index"
import swaggerSpec from "./swagger/SwaggerSpec"

const app = express()

app.use(bodyParser.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/api", allRoutes)

export default app
