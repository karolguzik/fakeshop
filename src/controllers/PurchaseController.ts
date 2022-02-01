import "reflect-metadata";
import { Request, Response } from "express";

import { controller, get } from "../decorators";
import { Service } from "typedi";

@controller("/")
@Service()
export class PurchaseController {
  @get("/purchaseHistory")
  getPurchaseHistory(req: Request, res: Response): void {
    res.render("pages/client/purchaseHistory", { user: req.session.user });
  }
}
