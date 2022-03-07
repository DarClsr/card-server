"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var position_controller_1 = require("../controller/position.controller");
var postionRoute = express_1.default.Router();
postionRoute.post("/create", position_controller_1.createHandler);
postionRoute.get("/list", function (req, res) {
    res.send("list");
});
exports.default = postionRoute;
