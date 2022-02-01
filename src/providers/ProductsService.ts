import { Service } from "typedi";

import ProductsRepository from "../repositories/ProductsReposistory";

import { CreateCategoryDto } from "./../dto/products/CreateCategoryDto";
import { CreateProductDto } from "./../dto/products/CreateProductDto";
import { Category } from "../interfaces/Category";
import { Product } from "../interfaces/Product";
import { Message } from "../interfaces/Message";

@Service()
class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getCategories(): Promise<Category[]> {
    return await this.productsRepository.getCategories();
  }

  async getProducts(): Promise<Product[]> {
    return await this.productsRepository.getProducts();
  }

  async getProductsByCategory(id: number): Promise<Product[]> {
    return await this.productsRepository.getProductsByCategory(id);
  }

  async getProductById(id: number): Promise<Product> {
    return await this.productsRepository.getProductById(id);
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Message> {
    return await this.productsRepository.createCategory(createCategoryDto);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Message> {
    return await this.productsRepository.createProduct(createProductDto);
  }

  async deleteCategory(id: number): Promise<Message> {
    return await this.productsRepository.deleteCategory(id);
  }

  async deleteProduct(id: number): Promise<Message> {
    return await this.productsRepository.deleteProduct(id);
  }
}

export default ProductsService;
