import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import { IIdGenerator } from "@/core/shared/GeneratorID/IidGenerator"
import PageResponse from "@/core/shared/pagination/PageResponse"
import Pagination from "@/core/shared/pagination/Pagination"
import ICustomerRepository from "../../ports/out/CustomerRepository"
import Customer from "../entities/Customer"

export default class CustomerUseCase {
  constructor(
    private customerRepository: ICustomerRepository,
    private iGenerator: IIdGenerator,
  ) {}

  async registerCustomer(newCustomers: any): Promise<any> {
    const cpf = newCustomers.cpf.replace(/\D/g, "")
    if (!cpf) {
      throw new AppErrors(ErrosMessage.INFORM_NUMBER_CPF)
    }

    const existingCustomer = await this.customerRepository.findByCpf(cpf)

    if (existingCustomer) {
      throw new AppErrors(ErrosMessage.USUARIO_JA_EXISTE)
    }

    const newCustomer = Customer.factory({
      id: this.iGenerator.gerar(),
      name: newCustomers.name,
      email: newCustomers.email,
      cpf,
    })

    await this.customerRepository.save(newCustomer)

    return {
      id: newCustomer.id,
      cpf: newCustomer.cpf,
      email: newCustomer.email,
      name: newCustomer.name,
    }
  }

  async listAllCustomers(page: number): Promise<PageResponse<Customer>> {
    if (page <= 0) {
      throw new AppErrors(ErrosMessage.ENTER_PAGE_VALID, 404)
    }

    const customers = await this.customerRepository.listAll(page)
    const totalCustomers: number = await this.customerRepository.countCustomers()
    const totalPages = Math.ceil(totalCustomers / 10)
    if (!customers) {
      throw new AppErrors(ErrosMessage.LIST_NOT_LOCALIZED, 404)
    }
    const pagination: Pagination = {
      currentPage: page,
      totalPage: totalPages,
      totalItems: Number(totalCustomers),
      itemsPerPage: 10,
    }
    return {
      items: customers,
      pagination,
    }
  }

  async getCustomerCpf(cpf: string): Promise<Customer | null> {
    const _cpf = cpf.replace(/\D/g, "")
    if (_cpf.length !== 11) {
      throw new AppErrors(ErrosMessage.NUMBER_OF_CPF_MUST_CONTAIN_DIGITS)
    }

    if (!_cpf.toString().trim()) {
      throw new AppErrors(ErrosMessage.ENTER_VALID_NUMBER)
    }

    const returnValidation = await this.customerRepository.findByCpf(_cpf)
    if (!returnValidation) throw new AppErrors(ErrosMessage.USUARIO_NAO_LOCALIZADO, 401)

    return returnValidation
  }
}
