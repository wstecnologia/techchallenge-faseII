import GetCustomerCpfUseCase from "@/core/customer/domain/usecase/GetCustomerCpfUseCase"
import ListAllCustomersUseCase from "@/core/customer/domain/usecase/ListAllCustomersUseCase"
import RegisterCustomerUseCase from "@/core/customer/domain/usecase/RegisterCustomerUseCase"
import ICustomerRepository from "@/core/customer/ports/out/CustomerRepository"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import { ICustomerDto } from "../../dtos/curstomerDto"

export default class CustomerController {
  private _getCustomerCpfUseCase: GetCustomerCpfUseCase
  private _listAllCustomerUseCase: ListAllCustomersUseCase
  private _registerCustomerUseCase: RegisterCustomerUseCase

  constructor(
    private _customerRepository: ICustomerRepository,
    private _idGenerator: IIdGenerator,
  ) {
    this._getCustomerCpfUseCase = new GetCustomerCpfUseCase(this._customerRepository)
    this._listAllCustomerUseCase = new ListAllCustomersUseCase(this._customerRepository)
    this._registerCustomerUseCase = new RegisterCustomerUseCase(
      this._customerRepository,
      this._idGenerator,
    )
  }

  async register(customer: ICustomerDto) {
    return await this._registerCustomerUseCase.execute(customer)
  }

  async listAll(page: number = 0) {
    return await this._listAllCustomerUseCase.execute(page, 10)
  }

  async getCustomerCpf(cpf: string) {
    return await this._getCustomerCpfUseCase.execute(cpf)
  }
}
