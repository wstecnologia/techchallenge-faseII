import { Router } from "express"

import CustomersRoutes from "./Customers"
import OrderRoutes from "./Orders"
import CategoryRoutes from "./Categories"
import ProductRoutes from "./Products"

const routes = Router()

new CustomersRoutes(routes)
new OrderRoutes(routes)
new CategoryRoutes(routes)
new ProductRoutes(routes)

export { routes as allRoutes }
