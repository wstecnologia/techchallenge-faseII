import AppErrors from "@/core/shared/error/AppErrors"
import PaymentRepository from "../../ports/out/IPaymentRepository"
import { Payment } from "../entities/Payment"
import { QRCode } from "../value-objects/QRCode"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import { IIdGenerator } from "@/core/shared/GeneratorID/IidGenerator"
export default class PaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async processPayment(customerId: string, orderId: string, amount: number): Promise<Payment> {
    try {
      const fakeQRCode = "fake_qr_code"
      const payment = new Payment(orderId, amount)

      await this.paymentRepository.processPayment(payment)
      return payment
    } catch (error) {
      throw new AppErrors(ErrosMessage.PAGAMENTO_NAO_PROCESSADO, 401)
    }
  }

  async findById(paymentId: string): Promise<Payment | null> {
    return await this.paymentRepository.findById(paymentId)
  }
}
