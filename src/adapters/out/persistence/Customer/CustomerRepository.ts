import db from "@/adapters/out/persistence/DB/db"
import Customer from "@/core/customer/domain/entities/Customer"
import ICustomerRepository from "@/core/customer/ports/out/CustomerRepository"

export default class CustomerRepository implements ICustomerRepository {
  async findByCpf(cpf: string): Promise<Customer | null> {
    const usuario = await db.oneOrNone(`select * from customers where cpf = $1`, [cpf])
    if (!usuario) return null
    return usuario
  }

  async listAll(page: number = 0): Promise<Customer[] | null> {
    const usuario: Customer[] = await db.any(
      `select * from customers LIMIT 10 OFFSET(${page - 1} * 10)`,
    )

    if (usuario.length === 0) return null

    return usuario
  }

  async countCustomers(): Promise<number> {
    const qtde = await db.oneOrNone(`select count(*) total from customers`)
    if (!qtde) return 0

    return qtde.total
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const usuario = await db.oneOrNone(`select * from customers where email = $1`, [email])

    if (!usuario) return null
    return usuario
  }

  async save(customer: Customer): Promise<void> {
    await db.query(
      `insert into customers (id, name, email, cpf)
        values ($1, $2, $3, $4)`,
      [customer.id, customer.name, customer.email, customer.cpf],
    )
  }
}
