import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModal {
    public id: number;
    public description: string
    public location: string;
    public fromDate: string;
    public untilDate: string;
    public price: number;
    public isFollowing: number;
    public followersCount: number
    public imageName: string;
    public image: UploadedFile;

    public constructor(vacation: VacationModal) {
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

    private static postValidationSchema = Joi.object ({
        id: Joi.forbidden(),
        description: Joi.string().required().min(5).max(200),
        location: Joi.string().required().min(2).max(50),
        fromDate: Joi.string().required().min(5).max(10),
        untilDate: Joi.string().required().min(5).max(10),
        price: Joi.number().required().min(30).max(50000),
        isFollowing: Joi.number().optional().min(0),
        followersCount: Joi.number().optional().min(0),
        imageName: Joi.string().optional().min(10).max(60),
        image: Joi.object().optional()
    });

    private static putValidationSchema = Joi.object ({
        id: Joi.number().required().integer().min(1),
        description: Joi.string().required().min(5).max(200),
        location: Joi.string().required().min(2).max(50),
        fromDate: Joi.string().required().min(5).max(60),
        untilDate: Joi.string().required().min(5).max(60),
        price: Joi.number().required().min(30).max(50000),
        isFollowing: Joi.number().optional().min(0),
        followersCount: Joi.number().optional().min(0),
        imageName: Joi.string().optional().min(10).max(60),
        image: Joi.object().optional()
    });

    private static patchValidationSchema = Joi.object ({
        id: Joi.number().required().integer().min(1),
        description: Joi.string().optional().min(5).max(200),
        location: Joi.string().optional().min(2).max(50),
        fromDate: Joi.string().optional().min(5).max(60),
        untilDate: Joi.string().optional().min(5).max(60),
        price: Joi.number().optional().min(30).max(50000),
        isFollowing: Joi.number().optional().min(0),
        followersCount: Joi.number().optional().min(0),
        imageName: Joi.string().optional().min(10).max(60),
        image: Joi.object().optional()
    });

    public validatePost(): string {
        const result = VacationModal.postValidationSchema.validate(this, {abortEarly: false});
        return result.error?.message;
    }

    public validatePut(): string {
        const result = VacationModal.putValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = VacationModal.patchValidationSchema.validate(this, {abortEarly: false} );
        return result.error?.message;
    }
}

export default VacationModal;
