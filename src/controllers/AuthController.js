"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
require("reflect-metadata");
var decorators_1 = require("./decorators");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.getLogin = function (req, res) {
        // router.get("/", (req: Request, res: Response) => {
        //   res.send("this is main page");
        // });
        res.send("this is login page om asdasdg");
    };
    __decorate([
        decorators_1.get("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "getLogin", null);
    AuthController = __decorate([
        decorators_1.controller("/auth")
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
