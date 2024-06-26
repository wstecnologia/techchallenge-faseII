import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

interface ICustomer {
  id?: string
  name: string
  cpf: string
  email: string
}

export default class Customer {
  private _id: string
  private _name: string
  private _email: string
  private _cpf: string

  constructor(id: string, name: string, email: string, cpf: string) {
    this._id = id
    this._name = name
    this._email = email
    this._cpf = this.cpfValidate(cpf)
  }

  static factory(customer: ICustomer) {
    return new Customer(customer.id || "", customer.name, customer.email, customer.cpf)
  }

  //getter
  get id(): string {
    return this._id
  }

  get cpf(): string {
    return this.cpfValidate(this._cpf)
  }

  get name(): string {
    return this._name
  }
  get email(): string {
    return this._email
  }

  //setter
  set id(value: string) {
    this._id = value
  }

  set cpf(value: string) {
    this._cpf = value
  }

  set name(value: string) {
    this._name = value
  }

  set email(value: string) {
    this._email = value
  }

  //methods
  private cpfValidate(cpf: string): string {
    const strCpf = cpf.replace(/\D/g, "")
    if (strCpf.length !== 11) {
      throw new AppErrors(ErrosMessage.NUMBER_OF_CPF_MUST_CONTAIN_DIGITS)
    }

    if (!strCpf.toString().trim()) {
      throw new AppErrors(ErrosMessage.ENTER_VALID_NUMBER)
    }
    return strCpf.trim()
  }
}
