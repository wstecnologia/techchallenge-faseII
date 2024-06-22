import CustomerUseCase from "@/core/customer/domain/usecase/CustomerUseCase"
import ICustomerRepository from "@/core/customer/ports/out/CustomerRepository"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import { ICustomerDto } from "../../dtos/curstomerDto"

export default class CustomerController {
  private _customerUserCase: CustomerUseCase

  constructor(
    private _customerRepository: ICustomerRepository,
    private _idGenerator: IIdGenerator,
  ) {
    this._customerUserCase = new CustomerUseCase(this._customerRepository, this._idGenerator)
  }

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
