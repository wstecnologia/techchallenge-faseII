import ProductRepository from "@/adapters/out/persistence/Product/ProductRepository"

export default class UpdateProductUseCase {
  constructor(private _productRepository: ProductRepository) {}
  async execute(product: any): Promise<void> {
    await this._productRepository.updateProduct(product)
  }
}
