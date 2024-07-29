
import IOrderRepository from "@/core/order/ports/out/OrderRepository"
import { Situations } from "@/core/shared/constansts/situations"
import AppErrors from "@/core/shared/error/AppErrors"

import { inputPaymentDto, outputPaymentDto, PaymentStatus } from "@/adapters/in/dtos/paymentDto"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import IPaymentRepository from "../../ports/out/IPaymentRepository"
import { Payment } from "../entities/Payment"


export class UpdatePayment {
  constructor(
    private paymentRepository: IPaymentRepository,
    private orderRepository: IOrderRepository,
  ) { }

  async updatePaymentStatus(
    paymentId: string,
    status: PaymentStatus,
  ): Promise<outputPaymentDto | null> {
    const payment = await this.paymentRepository.findById(paymentId)
    if (!payment) {
      throw new AppErrors(ErrosMessage.PAYMENT_NOT_FOUND)
    }

    const paymentDto: inputPaymentDto = {
      orderid: payment.orderid,
      amount: payment.amount,
      status: status,
    }

    const order = await this.orderRepository.findbyOrderId(paymentDto.orderid)

    if (!order) {
      throw new AppErrors(ErrosMessage.ORDER_NOT_FOUND)
    }

    if (status === PaymentStatus.Completed) {
      console.log(`status: ${status}`)
      const paymentEntity = new Payment(paymentDto, paymentId)
      await this.paymentRepository.update(paymentEntity)

      order.situationId = Situations.IN_PREPARATION
      this.orderRepository.updateOrderStatus(order.number, order.situationId)


      const paymentdto: outputPaymentDto {
        orderid: orde.orderid,

      }


      return paymentEntity
    } else if (status === PaymentStatus.Failed) {
      throw new AppErrors(ErrosMessage.INVALID_PAYMENT_STATUS)
    }

    return null
  }
}
