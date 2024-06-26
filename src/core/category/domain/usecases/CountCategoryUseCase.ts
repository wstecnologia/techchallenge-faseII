import CategoryRepository from "@/adapters/out/persistence/Category/CategoryRepository"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"

export default class CountCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private idGenerator: IIdGenerator,
  ) {}

  async countCategories(): Promise<number> {
    return await this.categoryRepository.countCategories()
  }
}
