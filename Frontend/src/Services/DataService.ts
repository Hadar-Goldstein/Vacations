import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { store } from "../Redux/Store";
import { vacationSlice } from "../Redux/VacationSlice";
import { appConfig } from "../Utils/AppConfig";
import { notify } from "../Utils/Notify";
import { tokenHandle } from "../Utils/TokenHandle";
import { userService } from "./UserService";

class DataService {
    public async getAllVacations(): Promise<VacationModel[]> {
        const token = localStorage.getItem("token");
        if (store.getState().vacations.length > 0 && !tokenHandle.isTokenExpired(token)) {
            return store.getState().vacations;
        }

        if (tokenHandle.isTokenExpired(token)) {
            userService.logout();
            notify.error("Session has expired. Please login.")
            return;
        }

        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        const vacations = response.data;

        const action = vacationSlice.actions.initVacations(vacations);
        store.dispatch(action);

        return vacations;
    }

    public async getVacationByIdAndUpdate(_id: string): Promise<VacationModel> {

        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + _id);
        const dbVacation = response.data;

        const action = vacationSlice.actions.updateVacation(dbVacation);
        store.dispatch(action);

        return dbVacation;
    }

    public async getRandomImages(): Promise<string[]> {

        const response = await axios.get<string[]>(appConfig.randomImagesUrl);
        const randomImages = response.data;

        return randomImages;
    }



    public async getImageFile(imageFileName: string): Promise<string> {

        const response = await axios.get<string>(appConfig.imagesUrl + imageFileName);
        const imageUrl = response.data;
        return imageUrl;
    }


    public async addVacation(vacation: VacationModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, { headers });
        const dbVacation = response.data;

        // Save in global state
        const action = vacationSlice.actions.AddVacation(dbVacation);
        store.dispatch(action);
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        console.log("Vacation ID:", vacation._id);
        const headers = { "Content-Type": "multipart/form-data" };
        console.log(appConfig.vacationsUrl + vacation._id, vacation, { headers });
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation._id, vacation, { headers });
        const dbVacation = response.data;
        const action = vacationSlice.actions.updateVacation(dbVacation);
        store.dispatch(action);
    }

    public async deleteVacation(_id: string): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + _id);
        const action = vacationSlice.actions.deleteVacation(_id);
        store.dispatch(action);
    }
}

export const dataService = new DataService();
