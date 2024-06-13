import Category from "@/core/category/domain/entities/Category"
import CategoryUseCase from "@/core/category/domain/usecases/Category.usecase"
import ICategoryRepository from "@/core/category/ports/out/ICategoryRepository"
import PageResponse from "@/core/shared/pagination/PageResponse"

export default class CategoryController implements ICategoryRepository {
  constructor(private categoryUseCase: CategoryUseCase) {}

  async countCategories(): Promise<number> {
    const qtde = await this.categoryUseCase.countCategories()
    if (!qtde) return 0
    return qtde
  }

  async registerCategory(category: Category): Promise<void> {
    await this.categoryUseCase.registerCategory(category)
  }

  async findById(categoryId: string): Promise<Category> {
    try {
      const category: Category = await this.categoryUseCase.findById(categoryId)
      return category
    } catch (error) {
      throw new Error("Could not find category")
    }
  }

  public async listAll(page: number): Promise<Category[]> {
    try {
      const categories: Category[] = await this.categoryUseCase.listAll(page)
      return categories
    } catch (error) {
      throw new Error("Could not list categories")
    }
  }

  public async listAllCategories(page: number): Promise<PageResponse<Category>> {
    return await this.categoryUseCase.listAllCategories(page)
  }

  async delete(categoryId: string): Promise<void> {
    await this.categoryUseCase.delete(categoryId)
  }
}
