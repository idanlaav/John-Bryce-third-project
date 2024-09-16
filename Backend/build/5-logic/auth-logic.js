"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_model_1 = require("../4-models/errors-model");
var dal_1 = __importDefault(require("../2-utils/dal"));
var cyber_1 = __importDefault(require("../2-utils/cyber"));
var role_model_1 = __importDefault(require("../4-models/role-model"));
function register(user) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, sql, values, result, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = user.validateRegister();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    user.username = user.username.toLowerCase();
                    return [4 /*yield*/, isUsernameExist(user.username)];
                case 1:
                    if (_a.sent()) {
                        throw new errors_model_1.ValidationError("This username: \"".concat(user.username, "\" already exists."));
                    }
                    sql = "INSERT INTO users VALUES(DEFAULT,?, ?, ?, ?, DEFAULT)";
                    user.password = cyber_1.default.hash(user.password);
                    values = [user.firstName, user.lastName, user.username, user.password];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 2:
                    result = _a.sent();
                    user.id = result.insertId;
                    user.role = role_model_1.default.User;
                    token = cyber_1.default.getNewToken(user);
                    delete user.password;
                    return [2 /*return*/, token];
            }
        });
    });
}
function login(credential) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, sql, values, result, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = credential.logInValidation();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    credential.username = credential.username.toLowerCase();
                    credential.password = cyber_1.default.hash(credential.password);
                    sql = "SELECT UserID as id, Username as username, Password as password, Role as role \n                 FROM users \n                 WHERE Username LIKE ?\n                 AND Password LIKE ?;";
                    values = [credential.username, credential.password];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 1:
                    result = _a.sent();
                    if (result[0] === undefined) {
                        throw new errors_model_1.UnauthorizedError("Incorrect username or password");
                    }
                    token = cyber_1.default.getNewToken(result);
                    delete credential.password;
                    return [2 /*return*/, token];
            }
        });
    });
}
function isUsernameExist(username) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, values, result, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT COUNT(Username) as count \n                 FROM users \n                 WHERE Username = ?";
                    values = [username];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 1:
                    result = _a.sent();
                    count = result[0].count;
                    return [2 /*return*/, count > 0];
            }
        });
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT UserID as id,FirstName as firstName, LastName as lastName,\n                 Username as username, Password as password, Role as role \n                 FROM users;";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, users];
            }
        });
    });
}
exports.default = {
    register: register,
    login: login,
    getAllUsers: getAllUsers
};
