import { expect } from "chai";
import { describe } from "mocha";
import mongoose from "mongoose";
import path from "path";
import supertest from "supertest";
import { StatusCode } from "../../src/3-models/enums";
import { IVacationModel } from "../../src/3-models/vacation-model";
import { app } from "../../src/app";

describe("Testing DataController", () => {

    let token: string;

    before(async () => {
        const credentials = { email: "hadargol71@gmail.com", password: "1234" };
        const response = await supertest(app.server)
            .post("/api/login")
            .send(credentials);

        token = response.body;
    });

    after(async () => {
        await mongoose.disconnect();
    });


    const authorized = () => ({
        get: (url: string) =>
            supertest(app.server).get(url).set("Authorization", `Bearer ${token}`),
        post: (url: string) =>
            supertest(app.server).post(url).set("Authorization", `Bearer ${token}`),
        put: (url: string) =>
            supertest(app.server).put(url).set("Authorization", `Bearer ${token}`),
        delete: (url: string) =>
            supertest(app.server).delete(url).set("Authorization", `Bearer ${token}`)
    });

    it("should return vacations array", async () => {
        const response = await authorized().get("/api/vacations");
        const vacations: IVacationModel[] = response.body;

        expect(response.status).to.equal(StatusCode.OK);
        expect(vacations.length).to.be.greaterThanOrEqual(1);
        expect(vacations[0]).to.have.keys(
            "_id", "destination", "description", "startDate", "endDate", "price", "imageFileName", "imageUrl", "likes", "likesCount");
    });

    it("should return random images array", async () => {
        const response = await authorized().get("/api/vacations/random-images");
        const imagesUrl: string[] = response.body;
        expect(response.status).to.equal(StatusCode.OK);
        expect(imagesUrl.length).to.equal(3);
        expect(imagesUrl[0]).to.be.a("string");
        expect(imagesUrl[1]).to.be.a("string");
        expect(imagesUrl[2]).to.be.a("string");
    });

    it("should return active vacations array", async () => {
        const response = await authorized().get("/api/vacations-active");
        const vacations: IVacationModel[] = response.body;
        expect(response.status).to.equal(StatusCode.OK);
        expect(vacations.length).to.be.greaterThanOrEqual(0);
        if (vacations.length > 0) {
            expect(vacations[0]).to.have.keys("_id", "destination", "description", "startDate", "endDate", "price", "imageFileName", "imageUrl", "likes", "likesCount");

            const now = new Date();
            const startDate = new Date(vacations[0].startDate);
            const endDate = new Date(vacations[0].endDate);

            expect(now).greaterThanOrEqual(startDate);
            expect(now).lessThanOrEqual(endDate);
        }
    });

    it("should return future vacations array", async () => {
        const response = await authorized().get("/api/vacations-future");
        const vacations: IVacationModel[] = response.body;
        expect(response.status).to.equal(StatusCode.OK);
        expect(vacations.length).to.be.greaterThanOrEqual(0);
        if (vacations.length > 0) {
            expect(vacations[0]).to.have.keys("_id", "destination", "description", "startDate", "endDate", "price", "imageFileName", "imageUrl", "likes", "likesCount");

            const now = new Date();
            const startDate = new Date(vacations[0].startDate);
            expect(now).lessThan(startDate);
        }
    });

    it("should return one vacation", async () => {
        const vacationId = "683af0929208b12ea5a333c9";
        const response = await authorized().get(`/api/vacations/${vacationId}`);
        const vacation: IVacationModel = response.body;

        expect(response.status).to.equal(StatusCode.OK);
        expect(vacation).to.have.keys(
            "_id", "destination", "description", "startDate", "endDate", "price", "imageFileName", "imageUrl", "likes", "likesCount"
        );
    });

    it("should add, update and delete a vacation", async () => {
        const imagePath = path.resolve(__dirname, "resources", "jerusalem.jpg");
        const addResponse = await authorized().post("/api/vacations")
            .field("destination", "Jerusalem, Israel")
            .field("description", "Jerusalem is one of the world’s oldest and most fascinating cities, a sacred crossroads of religion, culture, and heritage. From the ancient stones of the Old City to vibrant modern neighborhoods, Jerusalem offers a powerful blend of tradition and innovation. Explore iconic sites like the Western Wall, Church of the Holy Sepulchre, and Dome of the Rock, or enjoy local cuisine, markets, and museums in a city that lives and breathes history.")
            .field("startDate", "2025-12-22")
            .field("endDate", "2025-12-28")
            .field("price", 2000)
            .attach("image", imagePath);

        const dbVacation: IVacationModel = addResponse.body;

        expect(addResponse.status).to.equal(StatusCode.Created);
        expect(dbVacation).to.have.keys("_id", "destination", "description", "startDate", "endDate", "price", "imageFileName", "imageUrl", "likesCount");
        const vacationId = addResponse.body._id;

        const updateResponse = await authorized().put(`/api/vacations/${vacationId}`)
            .field("destination", "Jerusalem, Israel")
            .field("description", "Jerusalem is one of the world’s oldest and most fascinating cities, a sacred crossroads of religion, culture, and heritage. From the ancient stones of the Old City to vibrant modern neighborhoods, Jerusalem offers a powerful blend of tradition and innovation. Explore iconic sites like the Western Wall, Church of the Holy Sepulchre, and Dome of the Rock, or enjoy local cuisine, markets, and museums in a city that lives and breathes history.")
            .field("startDate", "2025-12-22")
            .field("endDate", "2025-12-28")
            .field("price", 1000);
        expect(updateResponse.status).to.equal(StatusCode.OK);

        const deleteResponse = await authorized().delete(`/api/vacations/${vacationId}`);
        expect(deleteResponse.status).to.equal(StatusCode.NoContent);
    });

    it("should return 404 error on route not found", async () => {
        const response = await authorized().get("/api/nothing");
        expect(response.status).to.equal(StatusCode.NotFound);
    });

    it("should return 404 error on resource not found", async () => {
        const response = await authorized().get("/api/vacations/100");
        expect(response.status).to.equal(StatusCode.NotFound);
    });

});
