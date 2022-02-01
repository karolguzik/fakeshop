import { Service } from "typedi";
import { pool } from "../dbconfig/dbconnector";

import { CreateCategoryDto } from "./../dto/products/CreateCategoryDto";
import { CreateProductDto } from "./../dto/products/CreateProductDto";
import { Category } from "../interfaces/Category";
import { Product } from "../interfaces/Product";
import { Message } from "./../interfaces/Message";

// type paramsType<T> = {
//   [key: string]: T;
// };

// type resultType = {
//   [key: string]: string;
// };

// async sqlQuery<QueryParams, Result>(
//   params: QueryParams,
//   queryText: string,
//   result: resultType | string
// ): Promise<any> {
//   const client = await pool.connect();

//   const queryParamsValues = [];

//   for (const [key, value] of Object.entries(params)) {
//     queryParamsValues.push(value);
//   }

//   await client.query(queryText, [...queryParamsValues]);

//   client.release();

//   return result;
// }

// async createProduct(createProductDto: CreateProductDto): Promise<Message> {
//   return this.sqlQuery(
//     createProductDto,
//     `INSERT INTO products (name, price, quantity, category_id) VALUES ($1, $2, $3, $4);`,
//     `Product successfully created.`
//   );
// }

@Service()
class ProductsRepository {
  async getCategories(): Promise<Category[]> {
    const client = await pool.connect();

    const sql = `SELECT id, name FROM categories;`;

    const { rows } = await client.query<Category>(sql);

    client.release();

    return rows;
  }

  async getProducts(): Promise<Product[]> {
    const client = await pool.connect();

    const sql = `SELECT id, name, price, quantity, category_id FROM products;`;

    const { rows } = await client.query<Product>(sql);

    client.release();

    return rows;
  }

  async getProductsByCategory(id: number): Promise<Product[]> {
    const client = await pool.connect();

    const sql = `SELECT id, name, price, quantity, category_id FROM products WHERE category_id = $1;`;

    const { rows } = await client.query<Product>(sql, [id]);

    client.release();

    return rows;
  }

  async getProductById(id: number): Promise<Product> {
    const client = await pool.connect();

    const sql = `SELECT id, name, price, quantity, category_id FROM products WHERE id = $1;`;

    const { rows } = await client.query<Product>(sql, [id]);

    client.release();

    return rows[0];
  }

  async createCategory(
    createCategorytDto: CreateCategoryDto
  ): Promise<Message> {
    const client = await pool.connect();

    const sql = `
      INSERT INTO categories (name)
      VALUES ($1);
    `;

    await client.query(sql, [createCategorytDto.name]);

    client.release();

    return { message: `Category successfully created.` };
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Message> {
    const client = await pool.connect();

    const sql = `
      INSERT INTO products (name, price, quantity, category_id)
      VALUES ($1, $2, $3, $4);
    `;

    await client.query(sql, [
      createProductDto.name,
      createProductDto.price,
      createProductDto.quantity,
      createProductDto.categoryId,
    ]);

    client.release();

    return { message: `Product successfully created.` };
  }

  async deleteCategory(id: number): Promise<Message> {
    const client = await pool.connect();

    const sql = `
      DELETE FROM categories WHERE id = $1;
    `;

    await client.query(sql, [id]);

    client.release();

    return { message: `Category successfully deleted.` };
  }

  async deleteProduct(id: number): Promise<Message> {
    const client = await pool.connect();

    const sql = `
      DELETE FROM products WHERE id = $1;
    `;

    await client.query(sql, [id]);

    client.release();

    return { message: `Product successfully deleted.` };
  }
}

export default ProductsRepository;
