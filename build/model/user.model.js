"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typegoose_1.prop)({ required: true, type: String })
    ], User.prototype, "nick_name", void 0);
    __decorate([
        (0, typegoose_1.prop)({ required: true, type: String })
    ], User.prototype, "account", void 0);
    __decorate([
        (0, typegoose_1.prop)({ required: true, type: String })
    ], User.prototype, "name", void 0);
    User = __decorate([
        (0, typegoose_1.ModelOptions)({})
    ], User);
    return User;
}());
exports.User = User;
var userModel = (0, typegoose_1.getModelForClass)(User);
exports.default = userModel;
