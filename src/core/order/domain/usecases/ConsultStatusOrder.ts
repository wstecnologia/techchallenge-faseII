import OrderRepository from "@/adapters/out/persistence/Order/OrderRepository"
import Order from "../entities/Order"

export default class ConsultStatusOrder {
  constructor(private _orderRepository: OrderRepository) {}

  async execute(status: string): Promise<Order | null> {
    return this._orderRepository.findOrderByStatus(status)
  }
}
