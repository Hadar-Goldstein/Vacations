import express, {Request, Response, NextFunction} from "express";
import { cyber } from "../2-utils/cyber";
import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";

class SecurityMiddleware {
    public validateToken(request: Request, response: Response, next: NextFunction) :void {
        // authorization: Bearer the-token
        const header = request.headers.authorization;
        const token = header?.substring(7);

        // If not legal
        if(!cyber.validateToken(token)) {
            const err = new ClientError(StatusCode.Unauthorized, "You are not logged in.");
            next(err);
            return;
        }

        //All is good
        next();
    }

    // Is user Admin
    public validateAdmin(request: Request, response: Response, next: NextFunction) :void {
        // authorization: Bearer the-token
        const header = request.headers.authorization;
        const token = header?.substring(7);

        // If not admin
        if(!cyber.validateAdmin(token)) {
            const err = new ClientError(StatusCode.Forbidden, "You are not authorized.");
            next(err);
            return;
        }

        //All is good
        next();
    }

    public preventXssAttack(request: Request, response: Response, next: NextFunction) {

}

export const securityMiddleware = new SecurityMiddleware();