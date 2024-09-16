"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModal = /** @class */ (function () {
    function VacationModal(vacation) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.location = vacation.location;
        this.fromDate = vacation.fromDate;
        this.untilDate = vacation.untilDate;
        this.price = vacation.price;
        this.isFollowing = vacation.isFollowing;
        this.followersCount = vacation.followersCount;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }
    VacationModal.prototype.validatePost = function () {
        var _a;
        var result = VacationModal.postValidationSchema.validate(this, { abortEarly: false });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModal.prototype.validatePut = function () {
        var _a;
        var result = VacationModal.putValidationSchema.validate(this, { abortEarly: false });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModal.prototype.validatePatch = function () {
        var _a;
        var result = VacationModal.patchValidationSchema.validate(this, { abortEarly: false });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModal.postValidationSchema = joi_1.default.object({
        id: joi_1.default.forbidden(),
        description: joi_1.default.string().required().min(5).max(200),
        location: joi_1.default.string().required().min(2).max(50),
        fromDate: joi_1.default.string().required().min(5).max(10),
        untilDate: joi_1.default.string().required().min(5).max(10),
        price: joi_1.default.number().required().min(30).max(50000),
        isFollowing: joi_1.default.number().optional().min(0),
        followersCount: joi_1.default.number().optional().min(0),
        imageName: joi_1.default.string().optional().min(10).max(60),
        image: joi_1.default.object().optional()
    });
    VacationModal.putValidationSchema = joi_1.default.object({
        id: joi_1.default.number().required().integer().min(1),
        description: joi_1.default.string().required().min(5).max(200),
        location: joi_1.default.string().required().min(2).max(50),
        fromDate: joi_1.default.string().required().min(5).max(60),
        untilDate: joi_1.default.string().required().min(5).max(60),
        price: joi_1.default.number().required().min(30).max(50000),
        isFollowing: joi_1.default.number().optional().min(0),
        followersCount: joi_1.default.number().optional().min(0),
        imageName: joi_1.default.string().optional().min(10).max(60),
        image: joi_1.default.object().optional()
    });
    VacationModal.patchValidationSchema = joi_1.default.object({
        id: joi_1.default.number().required().integer().min(1),
        description: joi_1.default.string().optional().min(5).max(200),
        location: joi_1.default.string().optional().min(2).max(50),
        fromDate: joi_1.default.string().optional().min(5).max(60),
        untilDate: joi_1.default.string().optional().min(5).max(60),
        price: joi_1.default.number().optional().min(30).max(50000),
        isFollowing: joi_1.default.number().optional().min(0),
        followersCount: joi_1.default.number().optional().min(0),
        imageName: joi_1.default.string().optional().min(10).max(60),
        image: joi_1.default.object().optional()
    });
    return VacationModal;
}());
exports.default = VacationModal;
