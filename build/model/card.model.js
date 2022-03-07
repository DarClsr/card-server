"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var user_model_1 = require("./user.model");
var Card = /** @class */ (function () {
    function Card() {
    }
    __decorate([
        (0, typegoose_1.prop)({ required: true, type: String })
    ], Card.prototype, "cardNo", void 0);
    __decorate([
        (0, typegoose_1.prop)({ required: true, type: String })
    ], Card.prototype, "banner", void 0);
    __decorate([
        (0, typegoose_1.prop)({ required: true, type: function () { return user_model_1.User; } })
    ], Card.prototype, "user", void 0);
    __decorate([
        (0, typegoose_1.prop)({ required: true, type: Number })
    ], Card.prototype, "balance", void 0);
    Card = __decorate([
        (0, typegoose_1.ModelOptions)({})
    ], Card);
    return Card;
}());
exports.Card = Card;
var shopModel = (0, typegoose_1.getModelForClass)(Card);
exports.default = shopModel;
