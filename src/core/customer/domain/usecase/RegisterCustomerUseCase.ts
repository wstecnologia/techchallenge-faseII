import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import ICustomerRepository from "../../ports/out/CustomerRepository"
import Customer from "../entities/Customer"

type Input = {
  cpf: string
  name: string
  email: string
}

type Output = {
  id: string
  cpf: string
  email: string
  name: string
}

export default class RegisterCustomerUseCase {
  constructor(
    private customerRepository: ICustomerRepository,
    private iGenerator: IIdGenerator,
  ) {}

  async execute(newCustomers: Input): Promise<Output> {
    const newCustomer = Customer.create({
      id: this.iGenerator.gerar(),
      name: newCustomers.name,
      email: newCustomers.email,
      cpf: newCustomers.cpf,
    })

    const existingCustomer = await this.customerRepository.findByCpf(newCustomer.cpf)

    if (existingCustomer) {
      throw new AppErrors(ErrosMessage.USUARIO_JA_EXISTE)
    }

    await this.customerRepository.save(newCustomer)

    return {
      id: newCustomer.id,
      cpf: newCustomer.cpf,
      email: newCustomer.email,
      name: newCustomer.name,
    }
  }
}
