import Joi from "joi";

class FollowModal {
    
    public followerId: number;
    public userId: number
    public vacationId: number;

    public constructor(follow: FollowModal) {
        this.followerId = follow.followerId;
        this.userId = follow.userId;
        this.vacationId = follow.vacationId;
    }

    private static postValidationSchema = Joi.object ({
        followerId: Joi.forbidden(),
        userId: Joi.number().required().min(0),
        vacationId: Joi.number().required().min(0),
    });

    public validatePost(): string {
        const result = FollowModal.postValidationSchema.validate(this, {abortEarly: false});
        return result.error?.message;
    }
    
}

export default FollowModal;
