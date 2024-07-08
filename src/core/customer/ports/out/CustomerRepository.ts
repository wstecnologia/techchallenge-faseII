import { IResponseListDto } from "@/core/shared/dto/ResponseListDto"
import Customer from "../../domain/entities/Customer"

export default interface ICustomerRepository {
  findByEmail(email: string): Promise<any | null>
  save(customer: any): Promise<void>
  listAll(page: number): Promise<IResponseListDto | null>
  findByCpf(cpf: any): Promise<Customer | null>
}
