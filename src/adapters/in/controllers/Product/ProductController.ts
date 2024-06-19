import ProductUseCase from "@/core/product/domain/usecases/ProductUseCase"
import IProductRepository from "@/core/product/ports/out/IProductRepository"
import { IIdGenerator } from "@/core/shared/GeneratorID/IidGenerator"
import PageResponse from "@/core/shared/pagination/PageResponse"
import IProductDTO from "../../dtos/productDto"

export default class ProductController {
  private _productUseCase: ProductUseCase
  constructor(
    private _productRepository: IProductRepository,
    private _idGenerator: IIdGenerator,
  ) {
    this._productUseCase = new ProductUseCase(this._productRepository, this._idGenerator)
  }

  async registerProduct(product: IProductDTO): Promise<void> {
    await this._productUseCase.registerProduct(product)
  }

  async findById(productId: string): Promise<IProductDTO[]> {
    const product = await this._productUseCase.findById(productId)
    return [product]
  }

  async findByCategory(categoryId: string, page: number): Promise<PageResponse<IProductDTO>> {
    return await this._productUseCase.findByCategory(categoryId, page)
  }

  async listAll(page: number): Promise<IProductDTO[]> {
    const products = await this._productUseCase.listAll(page)
    return products
  }

  async listAllProducts(page: number): Promise<PageResponse<IProductDTO>> {
    const products = await this._productUseCase.listAllProducts(page)
    return products
  }

  async delete(productId: string): Promise<void> {
    await this._productUseCase.delete(productId)
  }

  async updateProduct(product: IProductDTO): Promise<void> {
    await this._productUseCase.updateProduct(product)
  }
}
