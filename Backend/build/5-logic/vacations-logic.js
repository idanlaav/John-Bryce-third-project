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
var uuid_1 = require("uuid");
var fs_1 = __importDefault(require("fs"));
var dal_1 = __importDefault(require("../2-utils/dal"));
var socket_logic_1 = __importDefault(require("./socket-logic"));
var vacation_model_1 = __importDefault(require("../4-models/vacation-model"));
function getAllVacations(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT DISTINCT V.VacationID AS id,\n    V.Description AS description,\n    V.Location AS location,\n    V.FromDate AS fromDate,\n    V.UntilDate AS untilDate,\n    V.Price AS price,\n    V.ImageName AS imageName,\n    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ".concat(userId, ") AS isFollowing, \n    COUNT(F.userId) AS followersCount\n    FROM vacations as V LEFT JOIN followers as F\n    ON V.vacationId = F.vacationId\n    GROUP BY id\n    ORDER BY isFollowing DESC, followersCount DESC;");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    return [2 /*return*/, vacations];
            }
        });
    });
}
function getOneVacationById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations, vacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT VacationID AS id,\n                 Description AS description,\n                 Location AS location,\n                 Price AS price,\n                 FromDate AS fromDate,\n                 UntilDate AS untilDate,\n                 ImageName AS imageName\n                 FROM vacations\n                 WHERE VacationID = ".concat(id);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    vacation = vacations[0];
                    if (!vacation) {
                        throw new errors_model_1.ResourceNotFoundError(id);
                    }
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dotIndex, extension, sql, values, result, addedVacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = vacation.validatePost();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, isLocationExist(vacation.location)];
                case 1:
                    if (_a.sent()) {
                        throw new errors_model_1.ValidationError("This location: \"'".concat(vacation.location, "'\" already exists."));
                    }
                    if (!vacation.image) return [3 /*break*/, 3];
                    dotIndex = vacation.image.name.lastIndexOf(".");
                    extension = vacation.image.name.substring(dotIndex);
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    return [4 /*yield*/, vacation.image.mv("./src/1-assets/images/" + vacation.imageName)];
                case 2:
                    _a.sent();
                    delete vacation.image;
                    _a.label = 3;
                case 3:
                    sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
                    values = [vacation.description, vacation.location, vacation.fromDate, vacation.untilDate, vacation.price, vacation.imageName];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 4:
                    result = _a.sent();
                    vacation.id = result.insertId;
                    return [4 /*yield*/, getOneVacationById(vacation.id)];
                case 5:
                    addedVacation = _a.sent();
                    socket_logic_1.default.reportAddVacation(addedVacation);
                    return [2 /*return*/, addedVacation];
            }
        });
    });
}
function updateFullVacationDetails(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dotIndex, extension, sql, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = vacation.validatePut();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    if (!vacation.image) return [3 /*break*/, 2];
                    dotIndex = vacation.image.name.lastIndexOf(".");
                    extension = vacation.image.name.substring(dotIndex);
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    return [4 /*yield*/, vacation.image.mv("./src/1-assets/images/" + vacation.imageName)];
                case 1:
                    _a.sent();
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    sql = "UPDATE vacations SET\n                 Description = ?,\n                 Location = ?,\n                 FromDate = ?,\n                 UntilDate = ?,\n                 Price = ?,\n                 ImageName = ?\n                 WHERE VacationID = ?";
                    values = [vacation.description, vacation.location, vacation.fromDate, vacation.untilDate, vacation.price, vacation.imageName, vacation.id];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 3:
                    result = _a.sent();
                    socket_logic_1.default.reportUpdateVacation(vacation);
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(vacation.id);
                    }
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function updatePartialVacationDetails(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbVacation, dotIndex, extension, prop, updatedVacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = vacation.validatePatch();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, isLocationExist(vacation.location)];
                case 1:
                    if (_a.sent()) {
                        throw new errors_model_1.ValidationError("This location: \"'".concat(vacation.location, "'\" already exists."));
                    }
                    return [4 /*yield*/, getOneVacationById(vacation.id)];
                case 2:
                    dbVacation = _a.sent();
                    if (!vacation.image) return [3 /*break*/, 4];
                    dotIndex = vacation.image.name.lastIndexOf(".");
                    extension = vacation.image.name.substring(dotIndex);
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    return [4 /*yield*/, vacation.image.mv("./src/1-assets/images/" + vacation.imageName)];
                case 3:
                    _a.sent();
                    delete vacation.image;
                    _a.label = 4;
                case 4:
                    for (prop in dbVacation) {
                        if (vacation[prop] !== undefined) {
                            dbVacation[prop] = vacation[prop];
                        }
                    }
                    return [4 /*yield*/, updateFullVacationDetails(new vacation_model_1.default(dbVacation))];
                case 5:
                    updatedVacation = _a.sent();
                    socket_logic_1.default.reportUpdateVacation(vacation);
                    return [2 /*return*/, updatedVacation];
            }
        });
    });
}
function deleteVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var vacation, sql, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getOneVacationById(id)];
                case 1:
                    vacation = _a.sent();
                    fs_1.default.unlink("./src/1-assets/images/" + vacation.imageName, function () { });
                    sql = "DELETE FROM vacations WHERE VacationID =  ?";
                    values = [id];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 2:
                    result = _a.sent();
                    socket_logic_1.default.reportDeleteVacation(id);
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(id);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function isLocationExist(location) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, values, result, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT COUNT(location) as count \n                 FROM vacations \n                 WHERE Location = ?";
                    values = [location];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 1:
                    result = _a.sent();
                    count = result[0].count;
                    return [2 /*return*/, count > 0];
            }
        });
    });
}
exports.default = {
    getAllVacations: getAllVacations,
    getOneVacationById: getOneVacationById,
    addVacation: addVacation,
    updateFullVacationDetails: updateFullVacationDetails,
    updatePartialVacationDetails: updatePartialVacationDetails,
    deleteVacation: deleteVacation,
};
