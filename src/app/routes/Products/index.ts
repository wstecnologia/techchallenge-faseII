import ProductController from "@/adapters/in/controllers/Product/ProductController"
import ExpressAdapter from "../ExpressAdapter"

class ProductRoutes {
  private router: any
  private productController: ProductController

  constructor(router: any) {
    this.router = router
    this.productController = new ProductController()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post("/products", ExpressAdapter.adaptRoute(this.registerProduct.bind(this)))
    this.router.get("/products/id", ExpressAdapter.adaptRoute(this.findById.bind(this)))
    this.router.get("/products/category", ExpressAdapter.adaptRoute(this.findByCategory.bind(this)))
    this.router.get("/products", ExpressAdapter.adaptRoute(this.listAll.bind(this)))
    this.router.put("/products", ExpressAdapter.adaptRoute(this.UpdateProduct.bind(this)))
    this.router.delete("/products/id", ExpressAdapter.adaptRoute(this.delete.bind(this)))
  }

  private async registerProduct({ body }: { body: any }) {
    return this.productController.registerProduct(body)
  }

  private async findById({ query }: { query: any }) {
    const { id } = query
    return this.productController.findById(id.toString())
  }

  private async findByCategory({ query }: { query: any }) {
    const { category, page } = query
    return this.productController.findByCategory(category.toString(), Number(page))
  }

  private async listAll({ query }: { query: any }) {
    const { page } = query
    return this.productController.listAllProducts(Number(page))
  }

  private async delete({ query }: { query: any }) {
    const { id } = query
    return this.productController.delete(id)
  }

  private async UpdateProduct({ body }: { body: any }) {
    return this.productController.updateProduct(body)
  }
}

export default ProductRoutes
