import "reflect-metadata";
import { Request, Response } from "express";

import { controller, get } from "../decorators";
import { Service } from "typedi";

@controller("/")
@Service()
export class RootController {
  @get("/welcome")
  getWelcome(req: Request, res: Response): void {
    res.render("pages/public/welcome", { user: req.session.user });
  }

  @get("/404")
  get404(req: Request, res: Response): void {
    res.render("pages/public/404", {});
  }

  @get("/message")
  getMessage(req: Request, res: Response): void {
    res.render("pages/public/message", {
      message: req.session.message,
      redirectPage: req.session.redirectPage,
    });
  }
}
