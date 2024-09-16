"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stripTags = require("striptags");
function sanitize(request, response, next) {
    for (var prop in request.body) {
        if (typeof request.body[prop] === "string") {
            request.body[prop] = stripTags(request.body[prop]);
        }
    }
    next();
}
exports.default = sanitize;
