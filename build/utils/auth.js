"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ").pop();
    if (!token) {
        return res.status(401).send({
            msg: "身份验证需要令牌"
        });
    }
    try {
        if (!process.env.TOKEN_KEY)
            return false;
        var payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY);
        req.userId = payload === null || payload === void 0 ? void 0 : payload.id;
    }
    catch (err) {
        return res.status(401).send({
            msg: "令牌错误"
        });
    }
    return next();
};
exports.verifyToken = verifyToken;
