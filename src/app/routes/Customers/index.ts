// CustomerRoutes.ts
import CustomerController from "@/adapters/in/controllers/Customer/CustomerController"
import ExpressAdapter from "../ExpressAdapter"

class CustomersRoutes {
  private router: any
  private customerController: CustomerController

  constructor(router: any) {
    this.router = router
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post("/customers", ExpressAdapter.adaptRoute(this.register.bind(this)))
    this.router.get("/customers", ExpressAdapter.adaptRoute(this.listAll.bind(this)))
    this.router.get("/customers/cpf", ExpressAdapter.adaptRoute(this.getCustomerCpf.bind(this)))
  }

  private async register({ body }: { body: any }) {
    return await CustomerController.register(body)
  }

  private async listAll({ query }: { query: any }) {
    const { page } = query
    return await CustomerController.listAll(Number(page))
  }

  private async getCustomerCpf({ query }: { query: any }) {
    const { cpf } = query
    return await CustomerController.getCustomerCpf(cpf.toString())
  }
}

export default CustomersRoutes
