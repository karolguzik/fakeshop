"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
function get(path) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata("path", path, target, propertyKey);
    };
}
exports.get = get;
