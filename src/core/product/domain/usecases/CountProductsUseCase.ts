import ProductRepository from "@/adapters/out/persistence/Product/ProductRepository"

export default class CountProductUseCase {
  constructor(private _productRepository: ProductRepository) {}

  async countCategories(): Promise<number> {
    return await this._productRepository.countProducts()
  }
}
