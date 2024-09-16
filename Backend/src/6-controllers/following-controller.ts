import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import FollowModal from "../4-models/follow-model";
import followingLogic from "../5-logic/following-logic";

const router = express.Router();

router.get("/following-users", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followingUsers = await followingLogic.getFollowingUsers();                
        response.json(followingUsers);
    }
    catch (err: any) {
        next(err);
    }
})

router.post("/following-users", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowModal(request.body);
        const addedFollower = await followingLogic.addFollower(follower);
        response.status(201).json(addedFollower);
    }
    catch (err: any) {
        next(err);
    }
})

router.delete("/following-users/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await followingLogic.deleteFollowFromVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
})


export default router;