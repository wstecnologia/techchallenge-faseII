import { InputCreateOrder } from "@/core/adapters/dtos/CreateOrder"
import { IIdGenerator } from "@/core/adapters/interfaces/IidGenerator"
import IOrderRepository from "@/core/adapters/interfaces/OrderRepository"
import Order from "@/core/entities/Order"
import { OrderStatus } from "@/core/shared/constants/OrderStatus"
import AppErrors from "@/core/shared/error/AppErrors"
import ConsultStatusOrder from "@/core/useCases/order/ConsultStatusOrder"
import { CreateOrder } from "@/core/useCases/order/CreateOrder"
import { FinalizeOrder } from "@/core/useCases/order/FinalizeOrder"
import { InPreparation } from "@/core/useCases/order/InPreparation"
import { ListAllOrders } from "@/core/useCases/order/ListAllOrders"
import { OrderReadyUseCase } from "@/core/useCases/order/Ready"
import { UpdateStatusOrder } from "@/core/useCases/order/UpdateStatusOrder"

export default class OrderController {
  private createOrder: CreateOrder
  private listAllOrder: ListAllOrders
  private updateStatusOrder: UpdateStatusOrder
  private ucFinalizeOrder: FinalizeOrder
  private orderInPreparation:InPreparation
  private orderReady: OrderReadyUseCase
  private consultStatusOrder: ConsultStatusOrder
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly idGenerator: IIdGenerator,
  ) {
    this.createOrder = new CreateOrder(this.orderRepository, this.idGenerator)
    this.listAllOrder = new ListAllOrders(this.orderRepository)
    this.updateStatusOrder = new UpdateStatusOrder(this.orderRepository)
    this.orderInPreparation = new InPreparation(this.orderRepository)
    this.ucFinalizeOrder = new FinalizeOrder(this.orderRepository)
    this.orderReady = new OrderReadyUseCase(this.orderRepository)
    this.consultStatusOrder = new ConsultStatusOrder(this.orderRepository)
  }

  async addOrder(order: InputCreateOrder) {
    const returnOrder = await this.createOrder.execute(order)

    return returnOrder
  }

  async listAllOrders(page: number, limit: number) {
    return await this.listAllOrder.execute(page, limit)
  }



  async finalizeOrder(orderId: number): Promise<object | null> {
    return await this.ucFinalizeOrder.execute(orderId)
  }

  async updateStatus(query: any) {
    const { orderId, statusId } = query

    if(statusId === OrderStatus.IN_PREPARATION){
      return await this.orderInPreparation.execute(orderId)
    }
    if(statusId === OrderStatus.READY){
      return await this.orderReady.execute(orderId)
    }

    throw new AppErrors("Status not found", 404)
    //await this.updateStatusOrder.execute(orderId, statusId)
  }

  async consultStatus(status: string): Promise<Order | null> {
    return await this.consultStatusOrder.execute(status)
  }
}
