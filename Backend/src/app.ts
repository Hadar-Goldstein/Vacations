import cors from "cors";
import express, { Express } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { dal } from "./2-utils/dal";
import { dataController } from "./5-controllers/data-controller";
import { userController } from "./5-controllers/user-controller";
import { errorMiddleware } from "./6-middleware/error-middleware";
import { likesController } from "./5-controllers/likes-controller";


class App {

    public server: Express;

    public async start(): Promise<void> {

        // Create the server: 
        this.server = express();

        this.server.use(cors());

        this.server.use(express.json());

        this.server.use(fileUpload());
        fileSaver.config(path.join(__dirname, "1-assets", "images"));

        this.server.use("/api", dataController.router);
        this.server.use("/api", userController.router);
        this.server.use("/api", likesController.router);

        this.server.use("*", errorMiddleware.routeNotFound);

        this.server.use(errorMiddleware.catchAll);

        await dal.connect();

        // Run server: 
        this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
    }
}

export const app = new App();
app.start();


