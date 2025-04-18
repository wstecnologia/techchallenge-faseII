import { ICreateOrder, InputCreateOrder } from "@/core/adapters/dtos/CreateOrder"
import { IResponseRegisterDto } from "@/core/adapters/dtos/ResponseRegisterDto"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import IPaymentRepository from "@/core/adapters/interfaces/IPaymentRepository"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import { Payment } from "@/core/entities/Payment"
import { OrderStatus } from "@/core/shared/constants/OrderStatus"
import { PaymentStatus } from "@/core/shared/constants/PaymentStatus"
import AppErrors from "@/core/shared/error/AppErrors"
import Order from "../../entities/Order"
import OrderItems from "../../entities/OrderItems"

export class CreateOrder implements ICreateOrder {
  constructor(
    private _orderRepository: IOrderRepository,
    private _paymentRepository: IPaymentRepository,
    private _idGenerator: IIdGenerator,
  ) {}

  async execute(order: InputCreateOrder): Promise<IResponseRegisterDto> {

    if(order.items.length === 0){
      throw new AppErrors("Add items to order")
    }

    const orderNumber = await this._orderRepository.numberOrder()
    const orderId = this._idGenerator.gerar()
    const paymentId = this._idGenerator.gerar()

    const itemsWithId = order.items.map(item => {
      const orderItem = OrderItems.create({
        numberOrder: orderNumber,
        quantity: item.quantity,
        productId: item.productId,
        productDescription: item.productDescription,
        productPrice: item.productPrice,
        active: true,
      })

      orderItem.id = this._idGenerator.gerar()
      return orderItem
    })

    const ordernew = Order.create({
      id:orderId,
      number: orderNumber,
      items: itemsWithId,
      observation: order.observation,
      situationId: OrderStatus.AWAITING_PAYMENT,
      customerId: order.customerId,
    })

    const payment = Payment.create({
      id:paymentId,
      orderid:orderId,
      amount: ordernew.totalValue,
      status: PaymentStatus.Pending
    })

    await this._orderRepository.createdOrder(ordernew)
    await this._paymentRepository.save(payment)

    return {
      object: orderNumber,
      message: "Order placed successfully",
    }
  }
}
