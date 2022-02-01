import "reflect-metadata";
import "../providers/UsersService";
import { Request, RequestHandler, Response, NextFunction } from "express";
import Container, { ContainerInstance } from "typedi";

import { AppRouter } from "../AppRouter";
import { MetadataKeys, Methods } from "../enums";
import { isValidate } from "../middlewares/isValidate";

export function controller(pathPrefix: string): ClassDecorator {
  return function (target: any) {
    const router = AppRouter.getInstance();
    const instance = Container.get(target);

    for (let propertyKey in target.prototype) {
      const refactoredPathPrefix = pathPrefix === "/" ? "" : pathPrefix;
      // const routeHandler = target.prototype[propertyKey];

      const path: string = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        propertyKey
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        propertyKey
      );

      const middlewares: RequestHandler[] =
        Reflect.getMetadata(
          MetadataKeys.middleware,
          target.prototype,
          propertyKey
        ) || [];

      const requestBody: string =
        Reflect.getMetadata(
          MetadataKeys.validator,
          target.prototype,
          propertyKey
        ) || [];

      if (path) {
        router[method](
          `${refactoredPathPrefix}${path === "/" ? "" : path}`,
          ...middlewares,
          isValidate(requestBody),
          instance[propertyKey].bind(instance)
        );
      }
    }
  };
}
