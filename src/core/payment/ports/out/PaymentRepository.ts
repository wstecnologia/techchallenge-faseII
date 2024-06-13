import { Payment } from "../../domain/entities/Payment"

export default interface PaymentRepository {
  save(payment: Payment): Promise<void>
}
