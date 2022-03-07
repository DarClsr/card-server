"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var position_route_1 = __importDefault(require("./position.route"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.send("hello world");
});
router.use("/position", position_route_1.default);
exports.default = router;
