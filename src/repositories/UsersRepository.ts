import { Service } from "typedi";
import { pool } from "../dbconfig/dbconnector";

import { RegisterUserDto } from "../dto/auth/RegisterUserDto";
import { LoginUserDto } from "../dto/auth/LoginUserDto";
import { AddDetailsDto } from "../dto/users/AddDetailsDto";
import { AddAddressDto } from "../dto/users/AddAddressDto";
import { AddPaymentAccountDto } from "../dto/users/AddPaymentAccountDto";
import { User } from "../interfaces/User";
import { UserDetails } from "../interfaces/UserDetails";
import { UserAddress } from "../interfaces/UserAddress";
import { UserPaymentAccount } from "../interfaces/UserPaymentAccount";
import { Message } from "../interfaces/Message";

@Service()
class UsersRepository {
  async registerUser(registerUserDto: RegisterUserDto): Promise<Message> {
    const client = await pool.connect();

    const sql = `INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)`;

    await client.query(sql, [
      registerUserDto.username,
      registerUserDto.email,
      registerUserDto.password,
    ]);

    client.release();

    return {
      message:
        "Account successfully created. We will redirect you into login page in few seconds.",
    };
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const client = await pool.connect();

    const sql = `SELECT id, username, email, password FROM users WHERE username = $1 AND password = $2`;

    const { rows } = await client.query<User>(sql, [
      loginUserDto.username,
      loginUserDto.password,
    ]);

    client.release();

    return rows[0];
  }

  async getUserById(id: number): Promise<User> {
    const client = await pool.connect();

    const sql = `SELECT id, username, email, password FROM users WHERE id = $1`;

    const { rows } = await client.query<User>(sql, [id]);

    client.release();

    return rows[0];
  }

  async getEmail(email: string): Promise<{ email: string }> {
    const client = await pool.connect();

    const sql = `SELECT email FROM users WHERE email = $1`;

    const { rows } = await client.query<{ email: string }>(sql, [email]);

    client.release();

    return rows[0];
  }

  async getUsername(username: string): Promise<{ username: string }> {
    const client = await pool.connect();

    const sql = `SELECT username FROM users WHERE username = $1`;

    const { rows } = await client.query<{ username: string }>(sql, [username]);

    client.release();

    return rows[0];
  }

  async deleteUser(id: number): Promise<Message> {
    const client = await pool.connect();

    const sql = `DELETE FROM users WHERE id = $1`;

    await client.query(sql, [id]);

    client.release();

    return { message: `Account successfully deleted.` };
  }

  async getDetails(id: number): Promise<UserDetails> {
    const client = await pool.connect();

    const sql = `SELECT first_name, last_name FROM user_details WHERE id = $1`;

    const { rows } = await client.query<UserDetails>(sql, [id]);

    client.release();

    return rows[0];
  }

  async addDetails(addDetailsDto: AddDetailsDto): Promise<Message> {
    const client = await pool.connect();

    const sql = `UPDATE user_details SET first_name = $1, last_name = $2 WHERE id = $3`;

    await client.query(sql, [
      addDetailsDto.firstName,
      addDetailsDto.lastName,
      addDetailsDto.userId,
    ]);

    client.release();

    return { message: `Details successfully added.` };
  }

  async getAddress(id: number): Promise<UserAddress> {
    const client = await pool.connect();

    const sql = `SELECT city, street, postcode, country FROM user_address WHERE id = $1`;

    const { rows } = await client.query<UserAddress>(sql, [id]);

    client.release();

    return rows[0];
  }

  async addAddress(addAddressDto: AddAddressDto): Promise<Message> {
    const client = await pool.connect();

    const sql = `UPDATE user_address SET city = $1, street = $2, postcode = $3, country = $4 WHERE id = $5`;

    await client.query(sql, [
      addAddressDto.city,
      addAddressDto.street,
      addAddressDto.postcode,
      addAddressDto.country,
      addAddressDto.userId,
    ]);

    client.release();

    return { message: `Address successfully added.` };
  }

  async getPaymentAccount(id: number): Promise<UserPaymentAccount> {
    const client = await pool.connect();

    const sql = `SELECT account_name, account_number FROM user_details WHERE id = $1`;

    const { rows } = await client.query<UserPaymentAccount>(sql, [id]);

    client.release();

    return rows[0];
  }

  async addPaymentAccount(
    addPaymentAccountDto: AddPaymentAccountDto
  ): Promise<Message> {
    const client = await pool.connect();

    const sql = `UPDATE user_payment_account SET account_name = $1, account_number = $2 WHERE id = $3`;

    await client.query(sql, [
      addPaymentAccountDto.accountName,
      addPaymentAccountDto.accountNumber,
      addPaymentAccountDto.userId,
    ]);

    client.release();

    return { message: `Payment account successfully added.` };
  }
}

export default UsersRepository;
