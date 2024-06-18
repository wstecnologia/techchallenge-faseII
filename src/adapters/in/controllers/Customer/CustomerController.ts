import CustomerRepository from "@/adapters/out/persistence/Customer/CustomerRepository"
import Id from "@/adapters/out/persistence/generateID/Id"
import { ICustomerDto } from "../../dto/curstomerDto"
import CustomerUseCase from "@/core/customer/domain/usecase/Customer.usecase"

export default class CustomerController {
  constructor(
    _customerRepository = new CustomerRepository(),
    _idGenerator = new Id(),
    private _customerUserCase = new CustomerUseCase(_customerRepository, _idGenerator),
  ) {}

  async register(customer: ICustomerDto) {
    return await this._customerUserCase.registerCustomer(customer)
  }

  async listAll(page: number = 0) {
    return await this._customerUserCase.listAllCustomers(page)
  }

  async getCustomerCpf(cpf: string) {
    return await this._customerUserCase.getCustomerCpf(cpf)
  }
}
