import { RequestHandler } from "express";
import { MetadataKeys } from "../enums";

export function use(middleware: RequestHandler): Function {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const middlewares: RequestHandler[] =
      Reflect.getMetadata(MetadataKeys.middleware, target, propertyKey) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      propertyKey
    );
  };
}
