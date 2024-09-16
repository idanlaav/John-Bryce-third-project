import express, { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../4-models/errors-model";
import fs from "fs";
import path from "path";
import cyber from "../2-utils/cyber";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModal from "../4-models/vacation-model";
import logic from "../5-logic/vacations-logic";

const router = express.Router();

router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userLoggedIn = cyber.getTokenUserId(request);  
        const userId = +userLoggedIn
        const vacations = await logic.getAllVacations(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
})

router.get("/vacations/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacationById(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
})

router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files.image;
        const vacation = new VacationModal(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
})

router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        request.body.image = request.files?.image;
        const vacation = new VacationModal(request.body);
        const updatedVacation = await logic.updateFullVacationDetails(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
})

router.patch("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        request.body.image = request.files?.image;
        const vacation = new VacationModal(request.body);
        const updatedVacation = await logic.updatePartialVacationDetails(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
})

router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
})

router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        if(!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl)
        }
        response.sendFile(absolutePath)            
    }
    catch (err: any) {
        next(err);
    }
})


export default router;