import "reflect-metadata";
import { Request, Response } from "express";

import { controller, get } from "../decorators";
import { Service } from "typedi";

@controller("/payment")
@Service()
export class PaymentController {
  @get("/")
  getPayment(req: Request, res: Response): void {
    res.render("pages/client/payment", {});
  }
}
