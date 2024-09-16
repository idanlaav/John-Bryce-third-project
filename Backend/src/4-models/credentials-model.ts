import Joi from "joi";
import Role from "./role-model";

class CredentialsModel {
    public username: string;
    public password: string;
    public role: Role;

    public constructor(credential: CredentialsModel) {
        this.username = credential.username;
        this.password = credential.password;
        this.role = credential.role;
    }

    private static credentialValidation = Joi.object ({
        username: Joi.string().required().min(5).max(20),
        password: Joi.string().required().min(6).max(20),
        role: Joi.string().optional()
    })

    public logInValidation(): string {
        const result = CredentialsModel.credentialValidation.validate(this, {abortEarly: false} );
        return result.error?.message;
    }
}

export default CredentialsModel;