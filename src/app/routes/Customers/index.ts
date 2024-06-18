// CustomerRoutes.ts
import CustomerController from "@/adapters/in/controllers/Customer/CustomerController"
import ExpressAdapter from "../ExpressAdapter"
import { IdGenerator } from "@/core/shared/GeneratorID/IdGenerator"
import ICustomerRepository from "@/core/customer/ports/out/CustomerRepository"

class CustomersRoutes {
  private router: any
  private customerController: CustomerController
  private customerRepository: ICustomerRepository
  private idGenerator: IdGenerator

  constructor(router: any) {
    this.router = router

    this.customerController = new CustomerController(this.customerRepository, this.idGenerator)
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post("/customers", ExpressAdapter.adaptRoute(this.register.bind(this)))
    this.router.get("/customers", ExpressAdapter.adaptRoute(this.listAll.bind(this)))
    this.router.get("/customers/cpf", ExpressAdapter.adaptRoute(this.getCustomerCpf.bind(this)))
  }

  private async register({ body }: { body: any }) {
    return await this.customerController.register(body)
  }

  private async listAll({ query }: { query: any }) {
    const { page } = query
    return await this.customerController.listAll(Number(page))
  }

  private async getCustomerCpf({ query }: { query: any }) {
    const { cpf } = query
    return await this.customerController.getCustomerCpf(cpf.toString())
  }
}

export default CustomersRoutes
