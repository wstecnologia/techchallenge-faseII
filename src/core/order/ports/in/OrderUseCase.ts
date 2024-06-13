import Order from '../../domain/entities/Order'

export default interface OrderUseCase {
  addOrder(customerId: string, items: string[]): Promise<Order>
  updateOrderStatus(orderId: string, status: string): Promise<void>
}
