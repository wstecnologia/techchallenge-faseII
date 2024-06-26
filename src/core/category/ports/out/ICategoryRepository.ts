import { IResponseListDto } from "@/core/shared/dto/ResponseListDto"
import Category from "../../domain/entities/Category"

export default interface ICategorysitory {
  findById(categoryId: string): Promise<Category | null>
  registerCategory(category: Category): Promise<void>
  listAll(page: number, limit: number): Promise<IResponseListDto | null>
  countCategories(): Promise<number>
  delete(categoryId: string): Promise<void>
}
