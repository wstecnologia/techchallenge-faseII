import CategoryController from "@/adapters/in/controllers/Category/CategoryController"
import CategoryRepository from "@/adapters/out/persistence/Category/CategoryRepository"
import ICategorysitory from "@/core/category/ports/out/ICategoryRepository"
import { IdGenerator } from "@/core/shared/GeneratorID/IdGenerator"
import ExpressAdapter from "../ExpressAdapter"
class CategoryRoutes {
  private router: any
  private categoryRepository: ICategorysitory
  private categoryController: CategoryController
  private idGenerator: IdGenerator

  constructor(router: any) {
    this.router = router
    this.categoryRepository = new CategoryRepository()
    this.categoryController = new CategoryController(this.categoryRepository, this.idGenerator)
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post("/categories", ExpressAdapter.adaptRoute(this.registerCategory.bind(this)))
    this.router.get("/categories/id", ExpressAdapter.adaptRoute(this.findById.bind(this)))
    this.router.get("/categories", ExpressAdapter.adaptRoute(this.listAll.bind(this)))
    this.router.delete("/categories", ExpressAdapter.adaptRoute(this.deleteCategory.bind(this)))
  }

  private async registerCategory({ body }: { body: any }) {
    return this.categoryController.registerCategory(body)
  }

  private async findById({ query }: { query: any }) {
    const { id } = query
    return this.categoryController.findById(id.toString())
  }

  private async listAll({ query }: { query: any }) {
    const { page } = query
    return this.categoryController.listAllCategories(Number(page))
  }

  private async deleteCategory({ query }: { query: any }) {
    const { id } = query
    await this.categoryController.delete(id)
  }
}
export default CategoryRoutes
