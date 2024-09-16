"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_model_1 = require("../4-models/errors-model");
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret = "You can not crack my password! Idan Laav";
var myUser;
function getNewToken(user) {
    var payload = { user: user };
    var token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "1d" });
    var userIdLoggedIn = user.id;
    myUser = userIdLoggedIn;
    return token;
}
function verifyToken(request) {
    return new Promise(function (resolve, reject) {
        var header = request.headers.authorization;
        if (!header) {
            reject(new errors_model_1.UnauthorizedError("No token sent"));
            return;
        }
        var token = header.substring(7);
        if (!token) {
            reject(new errors_model_1.UnauthorizedError("No token sent"));
            return;
        }
        jsonwebtoken_1.default.verify(token, secret, function (err, payload) {
            if (err) {
                reject(new errors_model_1.UnauthorizedError("Invalid or expired token"));
                return;
            }
            resolve(true);
        });
        return token;
    });
}
function getTokenRole(request) {
    var header = request.headers.authorization;
    var token = header.substring(7);
    var payload = jsonwebtoken_1.default.decode(token);
    var user = payload.user[0];
    return user.role;
}
function getTokenUserId(request) {
    var header = request.headers.authorization;
    var token = header.substring(7);
    var payload = jsonwebtoken_1.default.decode(token);
    var user = payload.user[0];
    return user.id;
}
var salt = "MakeThingsGoRight";
function hash(plainText) {
    if (!plainText)
        return null;
    var hashText = crypto_1.default.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashText;
}
exports.default = {
    getNewToken: getNewToken,
    verifyToken: verifyToken,
    getTokenRole: getTokenRole,
    getTokenUserId: getTokenUserId,
    hash: hash
};
