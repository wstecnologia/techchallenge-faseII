import Order from "@/core/order/domain/entities/Order"
import OrderUseCase from "@/core/order/domain/usecases/OrderUseCase"
import IOrderRepository from "@/core/order/ports/out/OrderRepository"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import { Timer } from "@/core/shared/Timer"
import { IOrderDto } from "../../dtos/orderDto"

export default class OrderController {
  private _orderUseCase: OrderUseCase
  constructor(
    private _orderRepository: IOrderRepository,
    private _idGenerator: IIdGenerator,
  ) {
    this._orderUseCase = new OrderUseCase(this._orderRepository, this._idGenerator)
  }

  async addOrder(order: IOrderDto) {
    const returnOrder = await this._orderUseCase.addOrder(order)

    if (returnOrder) {
      Timer.timePreparation()
      Timer.timeReady()
    }

    return returnOrder
  }

  async listAllOrders(page: number) {
    return await this._orderUseCase.listAllOrders(page)
  }

  async finalizeOrder(orderId: number): Promise<object | null> {
    return await this._orderUseCase.finalizeOrder(orderId)
  }

  async updateStatus(orderId: number, status: string) {
    await this._orderUseCase.updateStatus(orderId, status)
  }

  async consultStatus(status: string): Promise<Order | null> {
    return await this._orderUseCase.consultStatus(status)
  }
}
