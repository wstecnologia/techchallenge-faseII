import Order from "@/core/order/domain/entities/Order"
import IOrderRepository from "@/core/order/ports/out/OrderRepository"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import { Timer } from "@/core/shared/Timer"
import { IOrderDto } from "../../dtos/orderDto"
import { createOrder } from "@/core/order/domain/usecases/CreateOrder"
import { ListAllOrders } from "@/core/order/domain/usecases/ListAllOrders"
import { UpdateStatusOrder } from "@/core/order/domain/usecases/UpdateStatusOrder"
import { FinalizeOrder } from "@/core/order/domain/usecases/FinalizeOrder"
import ConsultStatusOrder from "@/core/order/domain/usecases/ConsultStatusOrder"

export default class OrderController {
  private _createOrder: createOrder
  private _listAllOrder: ListAllOrders
  private _updateStatusOrder: UpdateStatusOrder
  private _finalizeOrder: FinalizeOrder
  private _consultStatusOrder: ConsultStatusOrder
  constructor(
    private _orderRepository: IOrderRepository,
    private _idGenerator: IIdGenerator,
  ) {
    this._createOrder = new createOrder(this._orderRepository, this._idGenerator)
    this._listAllOrder = new ListAllOrders(this._orderRepository)
    this._updateStatusOrder = new UpdateStatusOrder(this._orderRepository)
    this._finalizeOrder = new FinalizeOrder(this._orderRepository)
    this._consultStatusOrder = new ConsultStatusOrder(this._orderRepository)
  }

  async addOrder(order: IOrderDto) {
    const returnOrder = await this._createOrder.execute(order)

    if (returnOrder) {
      //Timer.timePreparation()
      //Timer.timeReady()
    }

    return returnOrder
  }

  async listAllOrders(page: number, limit: number) {
    return await this._listAllOrder.execute(page, limit)
  }

  async finalizeOrder(orderId: number): Promise<object | null> {
    return await this._finalizeOrder.execute(orderId)
  }

  async updateStatus(orderId: number, status: string) {
    await this._updateStatusOrder.execute(orderId, status)
  }

  async consultStatus(status: string): Promise<Order | null> {
    return await this._consultStatusOrder.execute(status)
  }
}
