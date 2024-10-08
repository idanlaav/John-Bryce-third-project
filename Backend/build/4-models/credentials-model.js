"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var CredentialsModel = /** @class */ (function () {
    function CredentialsModel(credential) {
        this.username = credential.username;
        this.password = credential.password;
        this.role = credential.role;
    }
    CredentialsModel.prototype.logInValidation = function () {
        var _a;
        var result = CredentialsModel.credentialValidation.validate(this, { abortEarly: false });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CredentialsModel.credentialValidation = joi_1.default.object({
        username: joi_1.default.string().required().min(5).max(20),
        password: joi_1.default.string().required().min(6).max(20),
        role: joi_1.default.string().optional()
    });
    return CredentialsModel;
}());
exports.default = CredentialsModel;
