import Customer from '@/core/customer/domain/entities/Customer'

export default interface CustomerUseCase {
  registerCustomer(name: string, email: string): Promise<Customer>
}
