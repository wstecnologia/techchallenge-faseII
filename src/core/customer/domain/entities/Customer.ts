import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import Cpf from "./Cpf"

interface ICustomer {
  id?: string
  name: string
  cpf: string
  email: string
}

export default class Customer {
  private cpf: Cpf
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    cpf: string,
  ) {
    this.cpf = new Cpf(cpf)
  }

  get getCpf(): string {
    return this.cpf.value
  }

  static create(customer: ICustomer) {
    if (!customer.cpf || !customer.email) {
      throw new AppErrors(ErrosMessage.ENTER_NUMBER_CPF_AND_EMAIL)
    }

    return new Customer(customer.id, customer.name, customer.email, customer.cpf)
  }
}
