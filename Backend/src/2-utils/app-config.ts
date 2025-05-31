import dotenv from "dotenv";

// Load ".env" file into process.env object:
dotenv.config();

class AppConfig {

    public readonly isDevelopment = process.env.ENVIRONMENT === "development";
    public readonly isProduction = process.env.ENVIRONMENT === "production";
    public readonly port = +process.env.PORT;
    public readonly mongodbConnectionString = process.env.MONGO_CONNECTION_STRING;
}

export const appConfig = new AppConfig();
