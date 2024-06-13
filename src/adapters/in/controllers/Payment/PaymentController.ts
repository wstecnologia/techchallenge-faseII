import { Request, Response } from 'express'
import PaymentUseCase from '@/core/payment/domain/usecases/Payment.usecase'
import { PaymentRepository } from '@/adapters/out/persistence/Payment/PaymentRepository'
import { Payment } from '@/core/payment/domain/entities/Payment'
import IPaymentUseCase from '@/core/payment/ports/in/IPaymentUseCase'

const paymentRepository = new PaymentRepository()
const paymentUseCase = new PaymentUseCase(paymentRepository)

export default class PaymentController implements IPaymentUseCase {
  async processPayment(customerId: string, orderId: string, amount: number): Promise<Payment> {
    const payment = await paymentUseCase.processPayment(customerId, orderId, amount)
    return payment
  }

  async findById(paymentId: string): Promise<Payment> {
    return await paymentUseCase.findById(paymentId)
  }
}
