import OrderController from "@/adapters/in/controllers/Order/OrderController"
import ExpressAdapter from "../ExpressAdapter"

export default class OrderRoutes {
  private router: any

  constructor(router: any) {
    this.router = router
    this.initiazeRoutes()
  }

  private initiazeRoutes() {
    this.router.post("/orders/new", ExpressAdapter.adaptRoute(this.newOrder.bind(this)))
    this.router.get("/orders/list", ExpressAdapter.adaptRoute(this.listAllOrders.bind(this)))
    this.router.post("/orders/payment", ExpressAdapter.adaptRoute(this.addPaymentOrders.bind(this)))
    this.router.put("/orders/finalize", ExpressAdapter.adaptRoute(this.finalizeOrder.bind(this)))
  }

  private async newOrder({ body }) {
    return await OrderController.addOrder(body)
  }

  private async listAllOrders({ query }) {
    return await OrderController.listAllOrders(query.page)
  }

  private async addPaymentOrders() {
    return { message: "Payment add success" }
  }

  private async finalizeOrder({ query }) {
    return await OrderController.finalizeOrder(query.orderId)
  }
}
