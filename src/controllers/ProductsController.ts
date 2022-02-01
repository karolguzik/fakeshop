import "reflect-metadata";
import { Request, Response } from "express";

import { controller, get, use } from "../decorators";
import { requireAuth } from "../middlewares/isAuth";
import { Service } from "typedi";

@controller("/products")
@Service()
export class ProductsController {
  @get("/")
  getProducts(req: Request, res: Response): void {
    res.render("pages/public/products", {
      user: req.session.user,
    });
  }
}
