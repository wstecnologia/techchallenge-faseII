import Customer from '../../domain/entities/Customer'

export default interface ICustomerRepository {
  findByEmail(email: string): Promise<Customer | null>
  save(customer: Customer): Promise<void>
  listAll(page:number): Promise<Customer[] | null>
  findByCpf(cpf:string): Promise<Customer | null>
  countCustomers():Promise<number> 
}
