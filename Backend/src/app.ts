import express, { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "./4-models/errors-model";
import cors from "cors"
import path from "path";
import expressFileUpload from "express-fileupload"
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import sanitize from "./3-middleware/sanitize";
import socketLogic from "./5-logic/socket-logic";
import authController from "./6-controllers/auth-controller";
import controller from "./6-controllers/vacations-controller";
import followingController from "./6-controllers/following-controller";

const expressServer = express();

if (config.isDevelopment) expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(sanitize);
expressServer.use(expressFileUpload());
expressServer.use("/api", authController)
expressServer.use("/api", controller);
expressServer.use("/api", followingController);
expressServer.use(express.static(path.join(__dirname, "./7-frontend")));
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    if(config.isDevelopment) {
        const err = new RouteNotFoundError(request.method, request.originalUrl);
        next(err);
    }
    else {
        response.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
})
expressServer.use(catchAll);

const httpServer = expressServer.listen(config.port, () => console.log("Listening..."));

socketLogic.init(httpServer);
