import { inputPaymentDto } from "@/core/adapters/dtos/PaymentDto"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import IPaymentRepository from "@/core/adapters/interfaces/IPaymentRepository"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import { Payment } from "@/core/entities/Payment"
import { PaymentStatus } from "@/core/shared/constants/PaymentStatus"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private idGenerator: IIdGenerator,
    private orderRepository: IOrderRepository,
  ) {}

  async execute(numberOrder: number, amount: number): Promise<Payment> {

    const orderId = await this.orderRepository.findOrderIdByNumber(numberOrder);
        if (!orderId) {
            throw new AppErrors(ErrosMessage.ORDER_NOT_FOUND);
        }

    const paymentDto: inputPaymentDto = {
      id:this.idGenerator.gerar(),
      orderid: orderId,
      amount: amount,
      status: PaymentStatus.Pending,
    }

    const payment = Payment.create(paymentDto)

    await this.paymentRepository.save(payment)
    return payment
  }
}
