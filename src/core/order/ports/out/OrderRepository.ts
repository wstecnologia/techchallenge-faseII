import Order from "../../domain/entities/Order"

export default interface IOrderRepository {
  createdOrder(order: Order): Promise<number | null>
  numberOrder(): Promise<number | null>
  listAllOrders(page: number): Promise<Order[] | null>
  updateOrderStatus(numberOrder: number, status: string): Promise<object | null>
  countOrders(): Promise<number | null>
  findOrderByNumber(orderNumber: number): Promise<Order | null>
  findOrderByStatus(status: string): Promise<Order | null>
}
