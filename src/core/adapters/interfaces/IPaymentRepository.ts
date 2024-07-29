import { Payment } from "@/core/entities/Payment"

export default interface IPaymentRepository {
  save(payment: Payment): Promise<void>
  findById(paymentId: string): Promise<Payment | null>
  update(payment: Payment): Promise<Payment | null>
}
