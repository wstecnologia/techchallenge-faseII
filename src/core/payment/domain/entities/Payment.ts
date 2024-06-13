export enum PaymentStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

export class Payment {
  private _status: PaymentStatus
  private _id?: string
  private _date: Date

  constructor(
    private _orderId: string,
    private _amount: number,
  ) {
    this._status = PaymentStatus.Completed
    this._date = new Date()
  }

  //getters
  get id(): string {
    return this._id
  }

  get orderId(): string {
    return this._orderId
  }
  get status(): PaymentStatus {
    return this._status
  }

  get date(): Date {
    return this._date
  }

  get amount(): number {
    return this._amount
  }

  //setters
  set id(value: string) {
    this._id = value
  }

  set orderId(value: string) {
    this._orderId = value
  }

  set date(value: Date) {
    this._date = value
  }

  set amount(value: number) {
    this._amount = value
  }
}
