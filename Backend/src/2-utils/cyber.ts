import { UnauthorizedError } from "../4-models/errors-model";
import { Request } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Role from "../4-models/role-model";
import UserId from "../4-models/user-model";
import UserModel from "../4-models/user-model";

const secret = "You can not crack my password! Idan Laav"
var myUser;

function getNewToken(user: UserModel): string {
    const payload = { user };
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });
    var userIdLoggedIn = user.id
    myUser = userIdLoggedIn
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const header = request.headers.authorization;        
        if(!header) {
            reject(new UnauthorizedError("No token sent"));
            return
        }
        const token = header.substring(7)
        if(!token) {
            reject(new UnauthorizedError("No token sent"));
            return
        }
        jwt.verify(token, secret, (err, payload)=> {
            if(err) {
                reject(new UnauthorizedError("Invalid or expired token"));
                return
            }
            resolve(true)
        });
        return token;
    });
}

function getTokenRole(request: Request): Role {
    const header = request.headers.authorization;
    const token = header.substring(7);
    const payload = jwt.decode(token);
    const user = (payload as any).user[0];    
    return user.role
}

function getTokenUserId(request: Request): UserId {
    const header = request.headers.authorization;
    const token = header.substring(7);
    const payload = jwt.decode(token);
    const user = (payload as any).user[0];    
    return user.id
}

const salt = "MakeThingsGoRight";

function hash(plainText: string): string {
    if(!plainText) return null;
    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashText;
}

export default {
    getNewToken,
    verifyToken,
    getTokenRole,
    getTokenUserId,
    hash
}