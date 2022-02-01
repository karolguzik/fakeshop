import { MetadataKeys, Methods } from "../enums";

function routeBinder(method: string): Function {
  return function (path: string) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, propertyKey);
      Reflect.defineMetadata(MetadataKeys.method, method, target, propertyKey);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const patch = routeBinder(Methods.patch);
export const del = routeBinder(Methods.del);
