import express, {Request, Response, NextFunction} from "express";
import { cyber } from "../2-utils/cyber";
import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";

class SecurityMiddleware {
    public validateToken(request: Request, response: Response, next: NextFunction) :void {
        const header = request.headers.authorization;
        const token = header?.substring(7);

        if(!cyber.validateToken(token)) {
            const err = new ClientError(StatusCode.Unauthorized, "You are not logged in.");
            next(err);
            return;
        }

        next();
    }

    public validateAdmin(request: Request, response: Response, next: NextFunction) :void {
        const header = request.headers.authorization;
        const token = header?.substring(7);

        if(!cyber.validateAdmin(token)) {
            const err = new ClientError(StatusCode.Forbidden, "You are not authorized.");
            next(err);
            return;
        }

        next();
    }
}

export const securityMiddleware = new SecurityMiddleware();