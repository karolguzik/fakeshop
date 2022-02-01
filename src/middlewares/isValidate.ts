import { Request, Response, NextFunction } from "express";

export function isValidate(keys: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    for (let key of keys) {
      req.session[key] = req.body[key];

      if (!req.body[key]) {
        req.session.validationError = `Missing property ${key}`;
        res.redirect(req.originalUrl);
        return;
      } else {
        delete req.session.validationError;
      }
    }

    next();
  };
}

// function bodyValidators(keys: string): RequestHandler {
//   return function(req: Request, res: Response, next: NextFunction) {
//     if (!req.body) {
//       res.status(422).send('Invalid request');
//       return;
//     }

//     for (let key of keys) {
//       if (!req.body[key]) {
//         res.status(422).send(`Missing property ${key}`);
//         return;
//       }
//     }

//     next();
//   };
// }
