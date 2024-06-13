import Category from '@/core/category/domain/entities/Category'

export default interface ICategoryUseCase {
  findById(categoryId: string): Promise<Category | null>
  registerCategory(category: Category): Promise<void>
  listAll(page: number): Promise<Category[] | null>
  countCategories(): Promise<number>
  delete(categoryId: string): void
}
