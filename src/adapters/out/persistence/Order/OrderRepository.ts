import Order from "@/core/order/domain/entities/Order"
import IOrderRepository from "@/core/order/ports/out/OrderRepository"
import db from "../DB/db"

export default class OrderRepository implements IOrderRepository {
  async findOrderByNumber(orderNumber: number): Promise<Order | null> {
    const order = await db.oneOrNone(`SELECT * FROM orders where number = $1 `, [orderNumber])

    return order
  }

  async findOrderByStatus(status: string): Promise<Order | null> {
    const order = await db.oneOrNone(
      `SELECT * FROM orders where situationid = $1 
      order by updated_at desc limit 1`,
      [status],
    )

    return order
  }

  async countOrders(): Promise<number> {
    const qtde = await db.oneOrNone(`
        SELECT
          count(o.id) total
        FROM orders o
        inner join situations s on s.id = o.situationid
        inner join customers c on c.id = o.customerid `)
    if (!qtde) return 0

    return qtde.total
  }

  async updateOrderStatus(numberOrder: number, status: string): Promise<object | null> {
    return await db.query(
      `UPDATE orders SET situationId = $1, updated_at = CURRENT_TIMESTAMP WHERE number = $2`,
      [status, numberOrder],
    )
  }

  async listAllOrders(page: number = 0): Promise<Order[] | null> {
    const orders: Order[] = await db.any(
      `SELECT
        o.number,
        o.datacreated,
        o.observation,
        s.description situation,
        c.name customerName
      FROM orders o
        inner join situations s on s.id = o.situationid
        inner join customers c on c.id = o.customerid 
      order by o.updated_at desc
      LIMIT 10 
      OFFSET(${page - 1} * 10)`,
    )
    return orders
  }

  async createdOrder(order: Order): Promise<number | null> {
    await db.query(
      `insert into orders (id, number, datacreated, customerid, situationid, observation)
          values ($1, $2, $3, $4, $5, $6)`,
      [
        order.id,
        order.number,
        order.dataCreated,
        order.customerId,
        order.situationId,
        order.observation,
      ],
    )

    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i]
      await db.query(
        `insert into ordersitems (id, numberorder, productid, productdescription, quantity, productprice, active, datacreated )
          values ($1, $2, $3, $4, $5, $6,$7,$8)`,
        [
          item.id,
          order.number,
          item.productId,
          item.productDescription,
          item.quantity,
          item.productPrice,
          true,
          item.dataCreated,
        ],
      )
    }

    await db.query(
      `insert into payments (id, orderid, amount, status )
          values ($1, $2, $3, $4)`,
      [order.payment.id, order.payment.orderId, order.payment.amount, order.payment.status],
    )

    return order.number
  }

  async numberOrder(): Promise<number | null> {
    const retorno = await db.oneOrNone(`select coalesce(max( number),999) + 1 number from orders`)
    return retorno.number
  }
}
