"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostionService = void 0;
var position_model_1 = __importDefault(require("../model/position.model"));
var CRUD_1 = require("./CRUD");
var PostionService = /** @class */ (function (_super) {
    __extends(PostionService, _super);
    function PostionService() {
        var _this = _super.call(this) || this;
        _this.model = position_model_1.default;
        return _this;
    }
    return PostionService;
}(CRUD_1.CrudService));
exports.PostionService = PostionService;
exports.default = new PostionService();
