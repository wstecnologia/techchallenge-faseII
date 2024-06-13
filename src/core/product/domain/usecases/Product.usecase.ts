import AppErros from "@/core/shared/error/AppErros"
import ErrosMessage from "@/core/shared/error/ErrosMessage"
import { IdGenerator } from "@/core/shared/GeneratorID/IdGenerator"
import PageResponse from "@/core/shared/pagination/PageResponse"
import Pagination from "@/core/shared/pagination/Pagination"
import IProductRepository from "../../ports/out/IProductRepository"
import Product from "../entities/Product"

export default class ProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private idGenerator: IdGenerator,
  ) {}

  async registerProduct(product: Product): Promise<void> {
    const existingProduct = await this.productRepository.findById(product.id)
    if (existingProduct) {
      throw new Error(ErrosMessage.PRODUTO_JA_EXISTE)
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
    if (!product) throw new AppErros(ErrosMessage.PRODUTO_NAO_LOCALIZADO, 400)
    return product
  }

  async findByCategory(categoryId: string, page: number): Promise<PageResponse<Product>> {
    const products = await this.productRepository.findByCategory(categoryId, page)

    if (!products) {
      throw new AppErros(ErrosMessage.PRODUTO_NAO_LOCALIZADO)
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

  async updateProduct(product: Product): Promise<void> {
    await this.productRepository.updateProduct(product)
  }
}
