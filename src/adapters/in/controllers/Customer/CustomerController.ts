import CustomerUseCase from "@/core/customer/domain/usecase/Customer.usecase"
import Customer from "@/core/customer/domain/entities/Customer"
import CustomerRepository from "@/adapters/out/persistence/Customer/CustomerRepository"
import Id from "@/adapters/out/persistence/generateID/Id"

const customerRepository = new CustomerRepository()
const idGenerator = new Id()
const customerUserCase = new CustomerUseCase(customerRepository, idGenerator)

export default class CustomerController {
  static async register(customer: Customer) {
    return await customerUserCase.registerCustomer(customer)
  }

  static async listAll(page: number = 0) {
    return await customerUserCase.listAllCustomers(page)
  }

  static async getCustomerCpf(cpf: string) {
    return await customerUserCase.getCustomerCpf(cpf)
  }
}
