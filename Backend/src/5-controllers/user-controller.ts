import express, { NextFunction, Request, Response } from "express";
import { userService } from "../4-services/user-service";
import { UserModel } from "../3-models/user-model";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";


class UserController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/users", this.getAllUsers);
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        this.router.get("/email-validation/:email", this.emailIsTaken);

    }

    private async getAllUsers(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            response.json(users);
        }
        catch (err: any) { next(err); }
    }

    private async emailIsTaken(request: Request, response: Response, next: NextFunction) {
        try {
            const email = request.params.email;
            const emailIsTaken = await userService.emailIsTaken(email);
            response.json(emailIsTaken);
        }
        catch (err: any) { next(err); }
    }

    private async register(request: Request, response: Response, next: NextFunction) {
        try {
            const user = new UserModel(request.body);
            const token = await userService.register(user);
            response.status(StatusCode.Created).json(token);
        }
        catch (err: any) { next(err); }
    }

    private async login(request: Request, response: Response, next: NextFunction) {
        try {
            const credentials = new CredentialsModel(request.body);
            const token = await userService.login(credentials);
            response.json(token);
        }
        catch (err: any) { next(err); }
    }
}

export const userController = new UserController();
