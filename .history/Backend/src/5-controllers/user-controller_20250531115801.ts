import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../3-models/credentials-model";
import { StatusCode } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";

class UserController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/users", this.getAllUsers);
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);

    }

    private async getAllUsers(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            response.json(users);
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
