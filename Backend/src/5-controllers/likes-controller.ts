import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { likesService } from "../4-services/likes-service";
import { LikeModel } from "../3-models/like-model";

class LikesController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/likes/:_id([0-9a-f]{24})", this.getLikesByUserId);
        this.router.get("/likes", this.getLikes);
        this.router.post("/likes", this.addLike);
        this.router.delete("/likes/:_id([0-9a-f]{24})", this.removeLike);

    }

    private async getLikes(request: Request, response: Response, next: NextFunction) {
        try {
            const likes = await likesService.getLikes();
            response.json(likes);
        }
        catch (err: any) { next(err); }
    }

    private async getLikesByUserId(request: Request, response: Response, next: NextFunction) {
        try {
            const _id = request.params._id;
            const likes = await likesService.getLikesByUserId(_id);
            response.json(likes);
        }
        catch (err: any) { next(err); }
    }

    private async addLike(request: Request, response: Response, next: NextFunction) {
        try {
            const like = new LikeModel(request.body);
            const dbLike = await likesService.addLike(like);
            response.status(StatusCode.Created).json(dbLike);
        }
        catch (err: any) { next(err); }
    }

    private async removeLike(request: Request, response: Response, next: NextFunction) {
        try {
            const _id = request.params._id;
            await likesService.removeLike(_id);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err); }
    }
}

export const likesController = new LikesController();
