"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = void 0;
var handlerError = function (err, req, res, next) {
    res.status(500).json(err.message);
};
exports.handlerError = handlerError;
