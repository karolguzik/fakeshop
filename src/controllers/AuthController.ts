import "reflect-metadata";
import { Request, Response } from "express";
import { Service } from "typedi";

import { controller, get, post, bodyValidator } from "../decorators";

import UsersService from "../providers/UsersService";

import { LoginUserDto } from "../dto/auth/LoginUserDto";
import { RegisterUserDto } from "../dto/auth/RegisterUserDto";

@controller("/")
@Service()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @get("/login")
  async getLogin(req: Request, res: Response): Promise<void> {
    res.render("pages/public/login", {
      user: req.session.user,
      validationError: req.session.validationError,
      accountCredentialsError: null,
      username: req.session.username,
      password: req.session.password,
    });
  }

  @post("/login")
  @bodyValidator("username", "password")
  async postLogin(req: Request, res: Response): Promise<void> {
    const loginUserDto: LoginUserDto = req.body;

    try {
      const user = await this.usersService.loginUser(loginUserDto);

      if (!user) {
        return res.render("pages/public/login", {
          user: req.session.user,
          validationError: null,
          accountCredentialsError: "Account does not exists.",
          username: req.session.username,
          password: req.session.password,
        });
      }

      req.session.isLogged = true;
      req.session.user = user;

      res.render("pages/public/products", { user });
    } catch (error) {
      console.log(error);
      res.render("pages/public/404", { redirectPage: "/login" });
    }
  }

  @get("/register")
  getRegister(req: Request, res: Response): void {
    res.render("pages/public/register", {
      user: req.session.user,
      validationError: req.session.validationError,
      accountCredentialsError: null,
      username: req.session.username,
      email: req.session.email,
      password: req.session.password,
    });
  }

  @post("/register")
  @bodyValidator("username", "email", "password")
  async postRegister(req: Request, res: Response): Promise<void> {
    const registerUserDto: RegisterUserDto = req.body;

    try {
      const usernameAlreadyExists = await this.usersService.getUsername(
        registerUserDto.username
      );

      if (usernameAlreadyExists) {
        return res.render("pages/public/register", {
          user: req.session.user,
          validationError: null,
          accountCredentialsError: "Username already exists",
          username: req.session.username,
          email: req.session.email,
          password: req.session.password,
        });
      }

      const emailAlreadyExists = await this.usersService.getEmail(
        registerUserDto.email
      );

      if (emailAlreadyExists) {
        return res.render("pages/public/register", {
          user: req.session.user,
          validationError: null,
          accountCredentialsError: "Email address already exists",
          username: req.session.username,
          email: req.session.email,
          password: req.session.password,
        });
      }

      const { message } = await this.usersService.registerUser(registerUserDto);

      res.render("pages/public/message", {
        message,
        redirectPage: "/login",
      });
    } catch (error) {
      console.log(error);
      res.render("pages/public/404", { redirectPage: "/register" });
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response): void {
    req.session.destroy();
    res.redirect("/welcome");
    // res.render("pages/public/welcome", { user: req.session.user });
  }
}
