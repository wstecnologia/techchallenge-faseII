import OrderRepository from "@/adapters/out/persistence/Order/OrderRepository"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import { IResponseRegisterDto } from "@/core/shared/dto/ResponseRegisterDto"
import OrderItems from "../entities/OrderItems"
import { Payment } from "@/core/payment/domain/entities/Payment"
import Order from "../entities/Order"

export class createOrder {
  constructor(
    private _orderRepository: OrderRepository,
    private _idGenerator: IIdGenerator,
  ) {}

  async execute(order: any): Promise<IResponseRegisterDto | null> {
    const orderNumber = await this._orderRepository.numberOrder()
    const orderId = this._idGenerator.gerar()

    const itemsWithId = order.items.map(item => {
      const orderItem = new OrderItems(
        orderNumber,
        item.quantity,
        item.productId,
        item.productDescription,
        item.productPrice,
        true,
      )

      orderItem.id = this._idGenerator.gerar()
      return orderItem
    })

    const payment = new Payment(orderId, order.payment.amount)
    payment.id = this._idGenerator.gerar()

    const ordernew = Order.factory({
      id: orderId,
      numberOrder: orderNumber,
      items: itemsWithId,
      observation: order.observation,
      customerId: order.customerId,
      payment,
    })

    await this._orderRepository.createdOrder(ordernew)

    return {
      object: orderNumber,
      message: "Order placed successfully",
    }
  }
}
