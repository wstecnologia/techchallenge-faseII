import ProductRepository from "@/adapters/out/persistence/Product/ProductRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"

export default class DeleteProductUseCase {
  constructor(private _productRepository: ProductRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this._productRepository.findById(productId)
    if (!product) {
      throw new AppErrors(ErrosMessage.CATEGORY_NOT_FOUND)
    }
    await this._productRepository.delete(productId)
  }
}
