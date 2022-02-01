import "reflect-metadata";
import { Request, Response } from "express";

import { controller, get } from "../decorators";
import { Service } from "typedi";

@controller("/profile")
@Service()
export class ProfileController {
  @get("/")
  getProfile(req: Request, res: Response): void {
    res.render("pages/client/profile", { user: req.session.user });
  }

  @get("/personality")
  getEditPersonality(req: Request, res: Response): void {
    res.render("pages/client/editPersonality", { user: req.session.user });
  }

  @get("/address")
  getEditAddress(req: Request, res: Response): void {
    res.render("pages/client/editAddress", { user: req.session.user });
  }

  @get("/paymentMethods")
  getEditPaymentMethods(req: Request, res: Response): void {
    res.render("pages/client/editPaymentMethods", { user: req.session.user });
  }
}
