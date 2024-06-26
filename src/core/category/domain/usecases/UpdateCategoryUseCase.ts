import CategoryRepository from "@/adapters/out/persistence/Category/CategoryRepository"

export default class UpdateCategoryUseCase {
  constructor(private _categoryRepository: CategoryRepository) {}

  async execute(category: any): Promise<void> {
    await this._categoryRepository.updateCategory(category)
  }
}
