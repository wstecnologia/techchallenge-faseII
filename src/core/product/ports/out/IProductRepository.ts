import Product from "../../domain/entities/Product"

export default interface IProductRepository {
  registerProduct(product: Product): Promise<void>
  findById(productId: string): Promise<Product | null>
  findByCategory(categoryid: string, page: number): Promise<Product[] | null>
  listAll(page: number): Promise<Product[]>
  countProducts(): Promise<number>
  delete(productId: string): void
  updateProduct(product: Product): Promise<void>
}
