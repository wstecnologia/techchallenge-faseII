import Category from "../../domain/entities/Category"

export default interface ICategorysitory {
  findById(categoryId: string): Promise<Category | null>
  registerCategory(category: Category): Promise<void>
  listAll(page: number): Promise<Category[] | null>
  countCategories(): Promise<number>
  delete(categoryId: string): Promise<void>
}
