import "reflect-metadata";
import { Request, Response } from "express";
import { Service } from "typedi";

import UsersService from "../providers/UsersService";

import { controller, get, post, bodyValidator, use } from "../decorators";

import { requireAuth } from "../middlewares/isAuth";

@controller("/users")
@Service()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @get("/addDetails")
  @use(requireAuth)
  async getDetails(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.usersService.getDetails(req.)
    } catch (error) {
      console.log(error);
      res.render("pages/public/404", { redirectPage: "/products" });
    }
  }

  @post("/addDetails")
  @bodyValidator()
  @use(requireAuth)
  async addDetails(req: Request, res: Response): Promise<any> {}

  @get("/addAddress")
  @use(requireAuth)
  async getAddress(req: Request, res: Response): Promise<any> {}

  @post("/addAddress")
  @bodyValidator()
  @use(requireAuth)
  async addAddress(req: Request, res: Response): Promise<any> {}

  @get("/addPaymentAccount")
  @use(requireAuth)
  async getPaymentAccount(req: Request, res: Response): Promise<void> {}

  @post("/addPaymentAccount")
  @bodyValidator()
  @use(requireAuth)
  async addPaymentAccount(req: Request, res: Response): Promise<void> {}
}
