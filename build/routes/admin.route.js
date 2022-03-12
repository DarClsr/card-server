"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_controller_1 = require("../controller/admin.controller");
var adminRouter = express_1.default.Router();
// 增加
adminRouter.post("/create", admin_controller_1.createHandler);
// 查询
adminRouter.get("/admin_list", function (req, res) {
    res.send("list");
});
// 更新
adminRouter.put("/:id", admin_controller_1.createHandler);
// 删除
adminRouter.delete("/:id", function (req, res) {
    res.send("list");
});
exports.default = adminRouter;
