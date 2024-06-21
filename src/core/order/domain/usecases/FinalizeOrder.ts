import OrderRepository from "@/adapters/out/persistence/Order/OrderRepository"
import AppErrors from "@/core/shared/error/AppErrors"

export class FinalizeOrder {
  constructor(private _orderRepository: OrderRepository) {}

  async execute(orderId: number): Promise<object | null> {
    const findOrder = await this._orderRepository.findOrderByNumber(orderId)

    if (!findOrder) {
      throw new AppErrors("ORDER NOT LOCATE", 404)
    }

    await this._orderRepository.updateOrderStatus(orderId, "3f4798e6-1f03-411e-b99b-73833c104255")
    return {
      message: "Order finalized of success!",
    }
  }
}
