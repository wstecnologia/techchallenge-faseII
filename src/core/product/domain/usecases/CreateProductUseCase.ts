import ErrosMessage from "@/core/shared/error/ErrosMessage"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import Product from "../entities/Product"

export default class CretateProductUseCase {
  constructor(
    private _productRepository,
    private _idGenerator: IIdGenerator,
  ) {}

  async execute(product: any): Promise<void> {
    const existingProduct = await this._productRepository.findById(product.id)
    if (existingProduct) {
      throw new Error(ErrosMessage.PRODUCT_ALREADY_EXISTS)
    }

    const newProduct = Product.factory({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      image: product.image,
      active: product.active,
      id: this._idGenerator.gerar(),
    })

    await this._productRepository.registerProduct(newProduct)
  }
}
