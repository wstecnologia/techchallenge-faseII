import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export class OrderReadyUseCase {
  constructor(private _orderRepository: IOrderRepository) {}

  async execute(orderId: number): Promise<object | null> {
    const order = await this._orderRepository.findOrderByNumber(orderId)

    if (!order) {
      throw new AppErrors(ErrosMessage.ORDER_NOT_FOUND, 404)
    }

    order.ready()

    await this._orderRepository.updateOrderStatus(order)
    return {
      message: "Order ready of success!",
    }
  }
}
