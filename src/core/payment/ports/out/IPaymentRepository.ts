import { Payment } from '../../domain/entities/Payment'

export default interface IPaymentRepository {
  processPayment(payment: Payment): Promise<void>
  findById(paymentId: string): Promise<Payment | null>
}
