import CategoryRepository from "@/adapters/out/persistence/Category/CategoryRepository"
import Id from "@/adapters/out/persistence/generateID/Id"
import CategoryUseCase from "@/core/category/domain/usecases/CategoryUseCase"
import PageResponse from "@/core/shared/pagination/PageResponse"
import ICategoryDTO from "../../dtos/categoryDto"

export default class CategoryController {
  constructor(
    _categoryRepository = new CategoryRepository(),
    _idGenerator = new Id(),
    private _categoryUseCase = new CategoryUseCase(_categoryRepository, _idGenerator),
  ) {}

  async countCategories(): Promise<number> {
    const qtde = await this._categoryUseCase.countCategories()
    if (!qtde) return 0
    return qtde
  }

  async registerCategory(category: ICategoryDTO): Promise<void> {
    await this._categoryUseCase.registerCategory(category)
  }

  async findById(categoryId: string): Promise<ICategoryDTO> {
    try {
      const category: ICategoryDTO = await this._categoryUseCase.findById(categoryId)
      return category
    } catch (error) {
      throw new Error("Could not find category")
    }
  }

  public async listAll(page: number): Promise<ICategoryDTO[]> {
    try {
      const categories: ICategoryDTO[] = await this._categoryUseCase.listAll(page)
      return categories
    } catch (error) {
      throw new Error("Could not list categories")
    }
  }

  public async listAllCategories(page: number): Promise<PageResponse<ICategoryDTO>> {
    return await this._categoryUseCase.listAllCategories(page)
  }

  async delete(categoryId: string): Promise<void> {
    await this._categoryUseCase.delete(categoryId)
  }
}
