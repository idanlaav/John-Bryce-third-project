"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var FollowModal = /** @class */ (function () {
    function FollowModal(follow) {
        this.followerId = follow.followerId;
        this.userId = follow.userId;
        this.vacationId = follow.vacationId;
    }
    FollowModal.prototype.validatePost = function () {
        var _a;
        var result = FollowModal.postValidationSchema.validate(this, { abortEarly: false });
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    FollowModal.postValidationSchema = joi_1.default.object({
        followerId: joi_1.default.forbidden(),
        userId: joi_1.default.number().required().min(0),
        vacationId: joi_1.default.number().required().min(0),
    });
    return FollowModal;
}());
exports.default = FollowModal;
