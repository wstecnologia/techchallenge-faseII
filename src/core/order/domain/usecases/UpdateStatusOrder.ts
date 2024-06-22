import OrderRepository from "@/adapters/out/persistence/Order/OrderRepository"
import { IResponseMessageDto } from "@/core/shared/dto/ResponseMessageDto"

export class UpdateStatusOrder {
  constructor(private _orderRepository: OrderRepository) {}

  async execute(orderId: number, status: string): Promise<IResponseMessageDto> {
    await this._orderRepository.updateOrderStatus(orderId, status)
    return {
      message: "Order updated successfully!",
    }
  }
}
