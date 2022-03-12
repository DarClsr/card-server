"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./../utils/auth");
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../controller/auth.controller");
var authRouter = express_1.default.Router();
//登录
authRouter.post("/login", auth_controller_1.LoginHandler);
authRouter.post("/logout", auth_1.verifyToken, auth_controller_1.logoutHandler);
exports.default = authRouter;
