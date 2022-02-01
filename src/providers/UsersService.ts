import { Service } from "typedi";

import UsersRepository from "../repositories/UsersRepository";

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
class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<Message> {
    return await this.usersRepository.registerUser(registerUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    return await this.usersRepository.loginUser(loginUserDto);
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.getUserById(id);
  }

  async getEmail(email: string): Promise<{ email: string }> {
    return await this.usersRepository.getEmail(email);
  }

  async getUsername(username: string): Promise<{ username: string }> {
    return await this.usersRepository.getUsername(username);
  }

  async deleteUser(id: number): Promise<Message> {
    return await this.usersRepository.deleteUser(id);
  }

  async getDetails(id: number): Promise<UserDetails> {
    return await this.usersRepository.getDetails(id);
  }

  async addDetails(addDetailsDto: AddDetailsDto): Promise<Message> {
    return await this.usersRepository.addDetails(addDetailsDto);
  }

  async getAddress(id: number): Promise<UserAddress> {
    return await this.usersRepository.getAddress(id);
  }

  async addAddress(addAddressDto: AddAddressDto): Promise<Message> {
    return await this.usersRepository.addAddress(addAddressDto);
  }

  async getPaymentAccount(id: number): Promise<UserPaymentAccount> {
    return await this.usersRepository.getPaymentAccount(id);
  }

  async addPaymentAccount(
    addPaymentAccountDto: AddPaymentAccountDto
  ): Promise<Message> {
    return await this.usersRepository.addPaymentAccount(addPaymentAccountDto);
  }
}

export default UsersService;
