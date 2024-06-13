import CategoryController from "@/adapters/in/controllers/Category/CategoryController"
import CategoryRepository from "@/adapters/out/persistence/Category/CategoryRepository"
import CategoryUseCase from "@/core/category/domain/usecases/Category.usecase"
import ExpressAdapter from "../ExpressAdapter"
import Id from "@/adapters/out/persistence/generateID/Id"
class CategoryRoutes {
  private router: any
  private categoryController: CategoryController

  constructor(router: any) {
    this.router = router
    const categoryRepository = new CategoryRepository()
    const idGenerator = new Id()
    const categoryUserCase = new CategoryUseCase(categoryRepository, idGenerator)
    this.categoryController = new CategoryController(categoryUserCase)
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
    console.log(`id : ${id}`)
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
