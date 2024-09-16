import { NextFunction, Request, Response } from "express";

const stripTags = require("striptags");

function sanitize(request: Request, response: Response, next: NextFunction) {
    for(const prop in request.body){
        if (typeof request.body[prop] === "string"){
        request.body[prop] = stripTags(request.body[prop])
        }
    }
    next()
}

export default sanitize;