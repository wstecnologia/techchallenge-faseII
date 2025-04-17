import Order from "../../entities/Order"
import { IResponseListDto } from "../dtos/ResponseListDto"

export default interface IOrderRepository {
  createdOrder(order: Order): Promise<number | null>
  numberOrder(): Promise<number | null>
  listAllOrders(page: number, limit: number): Promise<IResponseListDto | null>
  updateOrderStatus(order:Order): Promise<object | null>
  countOrders(): Promise<number | null>
  findOrderByNumber(orderNumber: number): Promise<Order | null>
  findOrderByStatus(status: string): Promise<Order | null>
  findByOrderId(id: string): Promise<Order | null>
}
