import { IResponseListDto } from "@/core/shared/dto/ResponseListDto"
import Product from "../../domain/entities/Product"

export default interface IProductRepository {
  registerProduct(product: Product): Promise<void>
  findById(productId: string): Promise<Product | null>
  findByCategory(categoryId: string, page: number, limit: number): Promise<IResponseListDto | null>
  listAll(page: number, limit: number): Promise<IResponseListDto | null>
  countProducts(): Promise<number>
  delete(productId: string): void
  updateProduct(product: Product): Promise<void>
}
