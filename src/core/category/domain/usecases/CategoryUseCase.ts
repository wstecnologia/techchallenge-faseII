import Category from "@/core/category/domain/entities/Category"
import ICategoryRepository from "@/core/category/ports/out/ICategoryRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import PageResponse from "@/core/shared/pagination/PageResponse"
import Pagination from "@/core/shared/pagination/Pagination"

export default class CategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private idGenerator: IIdGenerator,
  ) {}

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      throw new AppErrors(ErrosMessage.CATEGORY_NOT_FOUND)
    }
    return category
  }

  async registerCategory(category: Category): Promise<void> {
    const existingCategory = await this.categoryRepository.findById(category.id)

    if (existingCategory) {
      throw new AppErrors(ErrosMessage.CATEGORY_ALREADY_EXISTS)
    }

    const newCategory = Category.factory({
      name: category.name,
      description: category.description,
      activite: category.activite,
      id: this.idGenerator.gerar(),
    })

    await this.categoryRepository.registerCategory(newCategory)
  }

  async listAll(page: number = 1): Promise<Category[]> {
    return await this.categoryRepository.listAll(page)
  }

  async listAllCategories(page: number): Promise<PageResponse<Category>> {
    const categories = await this.listAll(page)
    const totalCategories: number = await this.categoryRepository.countCategories()
    const totalPages = Math.ceil(totalCategories / 10)

    const pagination: Pagination = {
      currentPage: page,
      totalPage: totalPages,
      totalItems: totalCategories,
      itemsPerPage: 10,
    }

    return {
      items: categories,
      pagination,
    }
  }

  async delete(categoryId: string): Promise<void> {
    const category = await this.findById(categoryId)
    if (!category) {
      throw new AppErrors(ErrosMessage.CATEGORY_NOT_FOUND)
    }
    await this.categoryRepository.delete(categoryId)
  }

  async countCategories(): Promise<number> {
    return await this.categoryRepository.countCategories()
  }
}
