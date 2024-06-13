import { Payment } from '../../domain/entities/Payment'

export default interface IPaymentUseCase {
  processPayment(customerId: string, orderId: string, amount: number): Promise<Payment>
  findById(paymentId: string): Promise<Payment | null>
}
