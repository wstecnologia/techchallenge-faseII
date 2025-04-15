
import { PaymentStatus } from "@/core/shared/constants/PaymentStatus"

export interface inputPaymentDto {
  id?: string
  orderid: string
  amount: number
  status: PaymentStatus
}

export interface outputPaymentDto {
  id: string
  orderid: string
  amount: number
  status: PaymentStatus
}
