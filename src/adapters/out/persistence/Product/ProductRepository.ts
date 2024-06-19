import Product from "@/core/product/domain/entities/Product"
import IProductRepository from "@/core/product/ports/out/IProductRepository"
import db from "../DB/db"

export default class ProductRepository implements IProductRepository {
  async registerProduct(product: Product): Promise<void> {
    await db.query(
      `INSERT INTO product (id, name, description, price, categoryid, image)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        product.id,
        product.name,
        product.description,
        product.price,
        product.categoryId,
        product.image,
      ],
    )
  }

  async countProducts(): Promise<number> {
    const result = await db.oneOrNone(`SELECT count(*) AS total FROM product WHERE active = true`)
    return result ? result.total : 0
  }

  async findById(productId: string): Promise<Product | null> {
    const query = "SELECT * FROM product WHERE id = $1 AND active = true"
    const result = await db.oneOrNone(query, [productId])
    return result ? Product.factory(result) : null
  }

  async findByCategory(categoryId: string, page: number = 1): Promise<Product[]> {
    const query = `SELECT * FROM product WHERE categoryid = $1 AND active = true LIMIT 10 OFFSET($2)`
    const offset = (page - 1) * 10
    const result = await db.any(query, [categoryId, offset])
    return result.map((row: any) => Product.factory(row))
  }

  async listAll(page: number = 1): Promise<Product[]> {
    const query = `SELECT * FROM product WHERE active = true LIMIT 10 OFFSET($1)`
    const offset = (page - 1) * 10
    const result = await db.any(query, [offset])
    return result.map((row: any) => Product.factory(row))
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
                       categoryid = $4,
                       image = $5
                       active = $6
                   WHERE id = $7`
    await db.none(query, [
      product.name,
      product.description,
      product.price,
      product.categoryId,
      product.image,
      product.id,
      product.activite,
    ])
  }
}
