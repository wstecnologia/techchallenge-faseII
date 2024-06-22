import ProductRepository from "@/adapters/out/persistence/Product/ProductRepository"
import AppErrors from "@/core/shared/error/AppErrors"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import { IIdGenerator } from "@/core/shared/GeneratorID/IIdGenerator"
import PageResponse from "@/core/shared/pagination/PageResponse"
import Pagination from "@/core/shared/pagination/Pagination"
import Product from "../entities/Product"

export default class ProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private idGenerator: IIdGenerator,
  ) {}

  async registerProduct(product: any): Promise<void> {
    const existingProduct = await this.productRepository.findById(product.id)
    if (existingProduct) {
      throw new Error(ErrosMessage.PRODUCT_ALREADY_EXISTS)
    }

    const newProduct = Product.factory({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      image: product.image,
      activite: product.activite,
      id: this.idGenerator.gerar(),
    })

    await this.productRepository.registerProduct(newProduct)
  }

  async findById(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId)
    if (!product) throw new AppErrors(ErrosMessage.PRODUCT_NOT_LOCALIZED, 400)
    return product
  }

  async findByCategory(categoryId: string, page: number): Promise<PageResponse<Product>> {
    const products = await this.productRepository.findByCategory(categoryId, page)

    if (!products) {
      throw new AppErrors(ErrosMessage.PRODUCT_NOT_LOCALIZED)
    }

    const totalProducts: number = await this.productRepository.countProducts()
    const totalPages = Math.ceil(totalProducts / 10)
    const pagination: Pagination = {
      currentPage: page,
      totalPage: totalPages,
      totalItems: Number(totalProducts),
      itemsPerPage: 10,
    }
    return {
      items: products,
      pagination,
    }
  }

  async listAll(page: number): Promise<Product[]> {
    return await this.productRepository.listAll(page)
  }

  async listAllProducts(page: number): Promise<PageResponse<Product>> {
    if (page <= 0) {
      throw new AppErrors(ErrosMessage.ENTER_PAGE_VALID, 404)
    }

    const products = await this.productRepository.listAll(page)
    const totalProducts: number = await this.productRepository.countProducts()
    const totalPages = Math.ceil(totalProducts / 10)

    const pagination: Pagination = {
      currentPage: page,
      totalPage: totalPages,
      totalItems: Number(totalProducts),
      itemsPerPage: 10,
    }
    return {
      items: products,
      pagination,
    }
  }

  async delete(productId: string): Promise<void> {
    return this.productRepository.delete(productId)
  }

  async updateProduct(product: any): Promise<void> {
    await this.productRepository.updateProduct(product)
  }
}
