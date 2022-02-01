import { MetadataKeys } from "../enums";

export function bodyValidator(...keys: string[]): Function {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDecorator
  ) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, propertyKey);
  };
}
