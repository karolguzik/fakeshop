import "reflect-metadata";
import { Request, Response } from "express";

import { controller, get } from "../decorators";
import { Service } from "typedi";

@controller("/basket")
@Service()
export class BasketController {
  @get("/")
  getBasket(req: Request, res: Response): void {
    res.render("pages/client/basket", { user: req.session.user });
  }
}
