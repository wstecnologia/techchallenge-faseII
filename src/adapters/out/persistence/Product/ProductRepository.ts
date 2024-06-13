import Product from "@/core/product/domain/entities/Product"
import IProductRepository from "@/core/product/ports/out/IProductRepository"
import db from "../DB/db"

export default class ProductRepository implements IProductRepository {
  async registerProduct(product: Product): Promise<void> {
    const productId = product.id

    await db.query(
      `INSERT INTO product (id, name, description, price, categoryid, image)
         VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        productId,
        product.name,
        product.description,
        product.price,
        product.categoryId,
        product.image,
      ],
    )
  }

  async countProducts(): Promise<number> {
    const qtde = await db.oneOrNone(`SELECT count(*) AS total FROM product WHERE active = true`)
    if (!qtde) return 0

    return qtde.total
  }

  async findById(productId: string): Promise<Product> {
    const query = "SELECT * FROM product WHERE id = $1 AND active = true"
    const result = await db.oneOrNone(query, [productId])
    if (!result) {
      return null
    }
    return result
  }

  async findByCategory(categoryid: string, page: number = 0): Promise<Product[]> {
    const query = `SELECT * FROM product WHERE categoryid = $1 AND active = true LIMIT 10
    OFFSET(${page - 1} * 10)`

    const result = await db.any(query, [categoryid])

    return result
  }

  async listAll(page: number = 0): Promise<Product[]> {
    const products: Product[] = await db.any(
      `SELECT * FROM product WHERE active = true LIMIT 10 OFFSET(${page - 1} * 10)`,
    )
    return products
  }

  async delete(productId: string): Promise<void> {
    const query = `UPDATE product SET active = false WHERE id = $1 AND active = true`
    await db.none(query, [productId])
  }

  async updateProduct(product: Product): Promise<void> {
    const query = `UPDATE product
                   SET name = $1,
                       description = $2,
                       price = $3,
                       categoryId = $4,
                       image = $5
                   WHERE id = $6 AND active = true`

    await db.none(query, [
      product.name,
      product.description,
      product.price,
      product.categoryId,
      product.image,
      product.id,
    ])
  }
}
