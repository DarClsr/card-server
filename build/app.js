"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var routes_1 = __importDefault(require("./routes"));
var db_1 = require("./utils/db");
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var error_handler_1 = require("./middleware/error-handler");
(0, db_1.connectDb)();
var server = (0, express_1.default)();
server.use((0, morgan_1.default)("dev"));
server.use(express_1.default.json());
server.use(body_parser_1.default.json());
server.use((0, cors_1.default)());
server.use("/admin/api/", routes_1.default);
server.use(error_handler_1.handlerError);
server.listen(process.env.PORT || 3000, function () {
    console.log("server starting " + process.env.PORT);
});
