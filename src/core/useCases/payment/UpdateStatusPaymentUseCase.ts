import { outputPaymentDto } from "@/core/adapters/dtos/PaymentDto"
import IPaymentRepository from "@/core/adapters/interfaces/IPaymentRepository"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import { PaymentStatus } from "@/core/shared/constants/PaymentStatus"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export class UpdateStatusPaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute(paymentId: string, status: PaymentStatus): Promise<outputPaymentDto> {
    const payment = await this.paymentRepository.findById(paymentId)
    if (!payment) {
      throw new AppErrors(ErrosMessage.PAYMENT_NOT_FOUND)
    }

    const order = await this.orderRepository.findByOrderId(payment.orderid)
    if (!order) {
      throw new AppErrors(ErrosMessage.ORDER_NOT_FOUND)
    }

    payment.approved(status)
    order.received()


    await this.paymentRepository.update(payment)
    await this.orderRepository.updateOrderStatus(order)

    return {
      id: paymentId,
      orderid: payment.orderid,
      amount: payment.amount,
      status: status,
    }
  }
}
