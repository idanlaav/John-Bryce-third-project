import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import Logic from "../5-logic/auth-logic";

const router = express.Router();

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await Logic.register(user);
        response.status(201).json(token);
    } 
    catch (err: any) {
        next(err);
    }
})

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credential = new CredentialsModel(request.body);
        const token = await Logic.login(credential);
        response.json(token);
    } 
    catch (err: any) {
        next(err);
    }
})

router.get("/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await Logic.getAllUsers();
        response.json(users);
    } 
    catch (err: any) {
        next(err);
    }
})

export default router;
