import OrderItems from "./OrderItems"
import { Payment } from "@/core/payment/domain/entities/Payment"

interface IOrder {
  id?: string
  numberOrder: number
  customerId: string
  items: OrderItems[]
  payment: Payment
  situationId?: string
  observation: string
}

export default class Order {
  private _id?: string
  private _dataCreated: Date
  private _customerId: string
  private _payments: Payment
  private _situationId?: string

  constructor(
    id: string,
    private _number: number,
    customerId: string,
    private _items: OrderItems[] = [],
    payment: Payment,
    situationId: string,
    private _observation: string,
  ) {
    this._id = id
    this._payments = payment
    this._dataCreated = new Date()
    this._situationId = this.validateSituation(situationId)
    this._customerId = this.validateCustomer(customerId)
  }

  static factory(order: IOrder) {
    return new Order(
      order.id,
      order.numberOrder,
      order.customerId,
      order.items,
      order.payment,
      order.situationId,
      order.observation,
    )
  }

  //getters
  get id(): string {
    return this._id
  }

  get payment(): Payment {
    return this._payments
  }

  get number(): number {
    return this._number
  }

  get dataCreated(): string {
    return this._dataCreated
  }

  get customerId(): string {
    return this._customerId
  }

  get situationId(): string {
    return this._situationId
  }

  get observation(): string {
    return this._observation
  }

  get items(): OrderItems[] {
    return this._items
  }

  //setters
  set id(value: string) {
    this._id = value
  }

  set payment(value: Payment) {
    this._payments = value
  }

  set number(value: number) {
    this._number = value
  }

  set customerId(value: string) {
    this._customerId = this.validateCustomer(value)
  }

  set situationId(value: string) {
    this._situationId = this.validateSituation(value)
  }

  set observation(value: string) {
    this._observation = value
  }

  set items(values: OrderItems[]) {
    this._items = values
  }

  private validateSituation(value: string): string {
    if (!value || value === "") {
      return "9e07b6f1-c470-4318-8c1a-2441771b600e"
    } else {
      return value
    }
  }

  private validateCustomer(value: string): string {
    if (value === "") {
      return "eefdd3d4-97af-4ae6-bdc7-2f8ec461b28c"
    } else {
      return value
    }
  }
}
