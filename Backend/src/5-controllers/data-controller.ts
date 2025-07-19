import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";
import { UploadedFile } from "express-fileupload";
import { VacationModel } from "../3-models/vacation-model";
import { dataService } from "../4-services/data-service";
import { securityMiddleware } from "../6-middleware/security-middleware";

class DataController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/vacations", securityMiddleware.validateToken, this.getAllVacations);
        this.router.get("/vacations-active", securityMiddleware.validateToken, this.getActiveVacations);
        this.router.get("/vacations-future", securityMiddleware.validateToken, this.getFutureVacations);
        this.router.get("/vacations/:_id([0-9a-f]{24})", securityMiddleware.validateToken, this.getVacationById);
        this.router.post("/vacations", securityMiddleware.validateToken, securityMiddleware.validateAdmin, this.addVacation);
        this.router.put("/vacations/:_id([0-9a-f]{24})", securityMiddleware.validateToken, securityMiddleware.validateAdmin, this.updateVacation);
        this.router.delete("/vacations/:_id([0-9a-f]{24})", securityMiddleware.validateToken, securityMiddleware.validateAdmin, this.deleteVacation);
        this.router.get("/vacations/images/:imageName", this.getImageFile);
        this.router.get("/vacations/random-images", this.getRandomImages);
    }

    private async getAllVacations(request: Request, response: Response, next: NextFunction) {
        try {
            const vacations = await dataService.getAllVacation();
            response.json(vacations);
        }
        catch (err: any) { next(err); }
    }


    private async getVacationById(request: Request, response: Response, next: NextFunction) {
        try {
            const _id = request.params._id;
            const vacation = await dataService.getVacationById(_id);
            response.json(vacation);
        }
        catch (err: any) { next(err); }
    }

    private async getActiveVacations(request: Request, response: Response, next: NextFunction) {
        try {
            const vacations = await dataService.getActiveVacations();
            response.json(vacations);
        }
        catch (err: any) { next(err); }
    }

    private async getFutureVacations(request: Request, response: Response, next: NextFunction) {
        try {
            const vacations = await dataService.getFutureVacations();
            response.json(vacations);
        }
        catch (err: any) { next(err); }
    }


    private async addVacation(request: Request, response: Response, next: NextFunction) {
        let imageJustUploaded = false;
        let imageName = undefined;
        try {
            const image = request.files?.image as UploadedFile;
            imageName = await fileSaver.add(image);
            imageJustUploaded = true;
            const vacation = new VacationModel({ ...request.body, imageFileName: imageName });
            const dbVacation = await dataService.addVacation(vacation);
            response.status(StatusCode.Created).json(dbVacation);
        }
        catch (err: any) {
            if (imageJustUploaded && imageName) await fileSaver.delete(imageName);
            next(err);
        }
    }

    private async updateVacation(request: Request, response: Response, next: NextFunction) {
        let newImageName: string | undefined;
        let imageJustUploaded = false;

        try {
            const oldImgName = await dataService.getImageName(request.params._id);
            if (request.files?.image) {
                const image = request.files.image as UploadedFile;
                newImageName = await fileSaver.add(image);
                console.log(newImageName);
                request.body.imageFileName = newImageName;
                await fileSaver.delete(oldImgName);
                imageJustUploaded = true;
            }
            else {
                request.body.imageFileName = oldImgName;
            }

            request.body._id = request.params._id;

            const vacation = new VacationModel(request.body);
            const dbVacation = await dataService.updateVacation(vacation);
            response.json(dbVacation);
        }
        catch (err: any) {
            if (imageJustUploaded && newImageName) await fileSaver.delete(newImageName);
            next(err);
        }
    }

    private async deleteVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const _id = request.params._id;
            const imgName = await dataService.getImageName(_id);
            await dataService.deleteVacation(_id);
            await fileSaver.delete(imgName);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err); }
    }

    private async getImageFile(request: Request, response: Response, next: NextFunction) {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName);
            response.sendFile(imagePath);
        }
        catch (err: any) { next(err); }
    }

    private async getRandomImages(request: Request, response: Response, next: NextFunction) {
        try {
            const randomImages = await dataService.getRandomImages();
            response.json(randomImages);
        }
        catch (err: any) { next(err); }
    }
}

export const dataController = new DataController();
