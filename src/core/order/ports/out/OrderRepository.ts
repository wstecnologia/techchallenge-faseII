import { IResponseListDto } from "@/core/shared/dto/ResponseListDto"
import Order from "../../domain/entities/Order"

export default interface IOrderRepository {
  createdOrder(order: Order): Promise<number | null>
  numberOrder(): Promise<number | null>
  listAllOrders(page: number, limit: number): Promise<IResponseListDto | null>
  updateOrderStatus(numberOrder: number, status: string): Promise<object | null>
  countOrders(): Promise<number | null>
  findOrderByNumber(orderNumber: number): Promise<Order | null>
  findOrderByStatus(status: string): Promise<Order | null>
}
