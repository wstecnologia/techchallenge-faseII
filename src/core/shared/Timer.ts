import OrderController from "@/adapters/in/controllers/Order/OrderController"
import Order from "../order/domain/entities/Order"

export class Timer {
  static async timePreparation() {
    const interval1 = setInterval(async () => {
      console.log(`Checking orders for preparation...`)
      const order: Order = await OrderController.consultStatus(
        "9e07b6f1-c470-4318-8c1a-2441771b600e",
      )

      if (order) {
        console.log(`${new Date().toLocaleTimeString()} - ${order.number} - Em preparação..`)
        OrderController.updateStatus(order.number, "f7f9ba46-ad25-4d10-a6aa-6c603aad6755")
      } else {
        clearInterval(interval1)
      }
    }, 5000)
  }

  static async timeReady() {
    const interval2 = setInterval(async () => {
      console.log(`Checking orders for delivery...`)
      const order: Order = await OrderController.consultStatus(
        "f7f9ba46-ad25-4d10-a6aa-6c603aad6755",
      )

      if (order) {
        console.log(
          `${new Date().toLocaleTimeString()} - ${order.number} - Pronto para retirada...`,
        )
        OrderController.updateStatus(order.number, "11729253-5280-4d6f-9619-53045076236e")
      } else {
        clearInterval(interval2)
      }
    }, 10000)
  }
}
