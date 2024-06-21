import Order from "../entities/Order"
import OrderRepository from "../../ports/out/OrderRepository"
import Pagination from "@/core/shared/pagination/Pagination"
import PageResponse from "@/core/shared/pagination/PageResponse"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import AppErrors from "@/core/shared/error/AppErrors"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import { Payment } from "@/core/payment/domain/entities/Payment"
import OrderItems from "../entities/OrderItems"
import { IOrderUseCaseDto } from "../../ports/in/OrderUseCaseDto"

export default class OrderUseCase {
  constructor(
    private _orderRepository: OrderRepository,
    private _idGenerator: IIdGenerator,
  ) {}

  async addOrder(order: any): Promise<object | null> {
    const orderNumber = await this._orderRepository.numberOrder()
    const orderId = this._idGenerator.gerar()

    const itemsWithId = order.items.map(item => {
      const orderItem = new OrderItems(
        orderNumber,
        item.quantity,
        item.productId,
        item.productDescription,
        item.productPrice,
        true,
      )

      orderItem.id = this._idGenerator.gerar()
      return orderItem
    })

    const payment = new Payment(orderId, order.payment.amount)
    payment.id = this._idGenerator.gerar()

    const ordernew = Order.factory({
      id: orderId,
      numberOrder: orderNumber,
      items: itemsWithId,
      observation: order.observation,
      customerId: order.customerId,
      payment,
    })

    await this._orderRepository.createdOrder(ordernew)

    return {
      order: orderNumber,
      message: "Order placed successfully",
    }
  }

  async finalizeOrder(orderId: number): Promise<object | null> {
    const findOrder = await this._orderRepository.findOrderByNumber(orderId)

    if (!findOrder) {
      throw new AppErrors("ORDER NOT LOCATE", 404)
    }

    await this._orderRepository.updateOrderStatus(orderId, "3f4798e6-1f03-411e-b99b-73833c104255")
    return {
      message: "Order finalized of success!",
    }
  }

  async listAllOrders(page: number, limit: number): Promise<PageResponse<any> | null> {
    if (page <= 0) {
      throw new AppErrors(ErrosMessage.ENTER_PAGE_VALID, 404)
    }
    const result = await this._orderRepository.listAllOrders(page, limit)

    if (result.items.length === 0) {
      throw new AppErrors(ErrosMessage.LIST_NOT_LOCALIZED, 404)
    }

    return PageResponse.responseList(result.items, result.totalItems, page, limit)
  }

  async updateStatus(orderId: number, status: string) {
    await this._orderRepository.updateOrderStatus(orderId, status)
    return {
      message: "Order finalized of success!",
    }
  }

  async consultStatus(status: string): Promise<Order | null> {
    return this._orderRepository.findOrderByStatus(status)
  }
}
