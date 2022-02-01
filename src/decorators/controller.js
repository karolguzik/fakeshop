"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
var express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
function controller(pathPrefix) {
    return function (target) {
        for (var key in target.prototype) {
            var refactoredPathPrefix = pathPrefix === "/" ? "" : pathPrefix;
            var path = Reflect.getMetadata("path", target.prototype, key);
            var method = target.prototype[key];
            if (method) {
                exports.router.get("" + refactoredPathPrefix + path, method);
            }
        }
    };
}
exports.controller = controller;
