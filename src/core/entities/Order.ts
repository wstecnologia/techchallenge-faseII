import { OrderStatus } from "@/core/shared/constants/OrderStatus"
import Entity from "../shared/Entity"
import AppErrors from "../shared/error/AppErrors"
import ErrosMessage from "../shared/error/ErrosMessage"
import OrderItems from "./OrderItems"

interface IOrder {
  number: number
  customerId: string
  items: OrderItems[]
  situationId?: string
  observation: string
}

enum DefaultCustomer {
  ANONYMOUS = "eefdd3d4-97af-4ae6-bdc7-2f8ec461b28c",
}

export default class Order extends Entity {
  private _totalValue:number

  constructor(
    private _number: number,
    private _items: OrderItems[] = [],
    private _customerId: string,
    private _situationId: string,
    private _observation: string,
  ) {
    super("")
    this._number = _number
    this._situationId = _situationId
    this._customerId = _customerId
    this._totalValue = this.calcValueTotal()
  }

  static create(order: IOrder) {
    const status = OrderStatus.AWAITING_PAYMENT
    const customer = order.customerId === "" ? DefaultCustomer.ANONYMOUS : order.customerId


    return new Order(
      order.number,
      order.items,
      customer,
      status,
      order.observation,

    )
  }

  get number(): number {
    return this._number
  }
  get observation(): string {
    return this._observation
  }
  get customerId(): string {
    return this._customerId
  }
  get totalValue(): number {
    return this._totalValue
  }

  get items(): OrderItems[] {
    return this._items
  }

  get situationId(): string {
    return this._situationId
  }


  addItemOrder(item: OrderItems) {
    this._items.push(item)
  }

  private calcValueTotal():number {
    return this._items.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }

  private validateSituation(value: string): string {
    if (!value || value === "") {
      return OrderStatus.AWAITING_PAYMENT
    } else {
      return value
    }
  }

  approved(status:string){

    if(status !== OrderStatus.AWAITING_PAYMENT) {
      throw new AppErrors(`${ErrosMessage.CURRENT_STATE_NOT_CHANGES} - ${status} `)
    }

    this._customerId = OrderStatus.PAYMENT_APPROVED
  }

  finalize() {
    if (this._situationId !== OrderStatus.PAYMENT_APPROVED) {
      throw new AppErrors(ErrosMessage.CURRENT_STATE_NOT_CHANGES)
    }
    this._situationId = OrderStatus.FINISHED
  }

  ready() {
    if (this._situationId !== OrderStatus.PAYMENT_APPROVED) {
      throw new AppErrors(ErrosMessage.CURRENT_STATE_NOT_CHANGES)
    }
    this._situationId = OrderStatus.READY
  }

  inPreparation(){
    if (this._situationId !== OrderStatus.READY) {
      throw new AppErrors(ErrosMessage.CURRENT_STATE_NOT_CHANGES)
    }
    this._situationId = OrderStatus.IN_PREPARATION
  }

  received() {
    if (this._situationId !== OrderStatus.AWAITING_PAYMENT) {
      throw new AppErrors(ErrosMessage.CURRENT_STATE_NOT_CHANGES)
    }
    this._situationId = OrderStatus.RECEIVED
  }

}
