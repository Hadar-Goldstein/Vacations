import { appConfig } from "./app-config";
import mongoose from "mongoose";

// Data Access Layer
class DAL {

    // Connect to MongoDB:
    public async connect(): Promise<void> {
        const db = await mongoose.connect(appConfig.mongodbConnectionString);
        console.log("We're connected to MongoDB " + db.connections[0].name);
    }

}

export const dal = new DAL();
