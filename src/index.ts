import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// import { connectToDB } from "./dbconfig/dbconnector";

import { AppRouter } from "./AppRouter";
import "./controllers/RootController";
import "./controllers/AuthController";
import "./controllers/ProductsController";
import "./controllers/ProfileController";
import "./controllers/BasketController";
import "./controllers/PaymentController";
import "./controllers/PurchaseController";

const app = express();
// connectToDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.set("trust proxy", 1); // trust first proxy

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err) {
//     res.redirect("pages/public/404");
//     return;
//   }

//   next();
// });

// app.use(cors);
app.use(
  session({ secret: "secret-key", saveUninitialized: true, resave: true })
);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
