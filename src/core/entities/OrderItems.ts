import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import Entity from "../shared/Entity"

type ICreateOrderItems = {
  numberOrder: number
  quantity: number
  productId: string
  productDescription: string
  productPrice: number
  active: boolean
}

export default class OrderItems extends Entity {
  private _totalValueItem:number

  constructor(
    private _numberOrder: number,
    private _quantity: number,
    private _productId: string,
    private _productDescription: string,
    private _productPrice: number,
    private _active: boolean,
  ) {
    super("")
    this._numberOrder = _numberOrder
    this._quantity = this.validateQuantity(_quantity)
    this._productId = _productId
    this._productDescription = _productDescription
    this._productPrice = _productPrice
    this._active = _active
    this._totalValueItem = this.sumTotalValueItem()
  }

  static create(orderItens: ICreateOrderItems) {
    return new OrderItems(
      orderItens.numberOrder,
      orderItens.quantity,
      orderItens.productId,
      orderItens.productDescription,
      orderItens.productPrice,
      orderItens.active,
    )
  }


  get numberOrder(): number {
    return this._numberOrder
  }

  get quantity(): number {
    return this._quantity
  }

  get productId(): string {
    return this._productId
  }

  get productDescription(): string {
    return this._productDescription
  }

  get productPrice(): number {
    return this._productPrice
  }

  get active(): boolean {
    return this._active
  }

  get totalValueItem():number {
    return this._totalValueItem
  }

  private sumTotalValueItem():number {
    return this._quantity * this._productPrice
  }

  private validateQuantity(value: number): number {
    if (typeof value !== "number" || isNaN(value) || value <= 0) {
      throw new AppErrors(ErrosMessage.ITEMS_WITH_QUANTITY_ZEROED)
    }
    return value
  }
}
