import OrderRepository from "@/adapters/out/persistence/Order/OrderRepository"
import Id from "@/adapters/out/persistence/generateID/Id"
import Order from "@/core/order/domain/entities/Order"
import OrderUseCase from "@/core/order/domain/usecases/Order.usecase"
import { Timer } from "@/core/shared/Timer"

const orderRepository = new OrderRepository()
const idGenerator = new Id()
const orderUseCase = new OrderUseCase(orderRepository, idGenerator)

export default class OrderController {
  static async addOrder(order: Order) {
    const returnOrder = await orderUseCase.addOrder(order)

    if (returnOrder) {
      Timer.timePreparation()
      Timer.timeReady()
    }

    return returnOrder
  }

  static async listAllOrders(page: number) {
    return await orderUseCase.listAllOrders(page)
  }

  static async finalizeOrder(orderId: number): Promise<object | null> {
    return await orderUseCase.finalizeOrder(orderId)
  }

  static async updateStatus(orderId: number, status: string) {
    await orderUseCase.updateStatus(orderId, status)
  }

  static async consultStatus(status: string): Promise<Order | null> {
    return await orderUseCase.consultStatus(status)
  }
}
