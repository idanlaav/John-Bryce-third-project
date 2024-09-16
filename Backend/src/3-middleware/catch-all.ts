import { NextFunction, Request, Response } from "express";

async function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message;

    if(process.env.NODE_ENV === "development") {
        response.status(status).send(message)
    }
    else{
        response.status(status).send("An error occurred, please try again later.")
    }
}

export default catchAll;