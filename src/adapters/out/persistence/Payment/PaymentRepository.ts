import { Payment } from "@/core/payment/domain/entities/Payment"
import IPaymentRepository from "@/core/payment/ports/out/IPaymentRepository"
import db from "../DB/db"

export class PaymentRepository implements IPaymentRepository {
  async processPayment(payment: Payment): Promise<void> {
    await db.query(
      `INSERT INTO payments (id, orderId, amount, qrCode, status)
         VALUES ($1, $2, $3, $4, $5)`,
      [payment.id, payment.orderId, payment.amount, "", payment.status],
    )
  }

  async findById(paymentId: string): Promise<Payment | null> {
    const query = "SELECT * payments Payment WHERE id = $1"
    const payment = await db.oneOrNone(query, [paymentId])
    if (!payment) {
      return null
    }
    return payment
  }
}
