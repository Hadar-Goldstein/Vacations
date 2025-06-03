import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { VacationModel } from "../Models/VacationModel";
import { vacationSlice } from "../Redux/VacationSlice";

class LikesService {
    public async getAllVacations(): Promise<VacationModel[]> {
        // Check global state
        if (store.getState().vacations.length > 0) return store.getState().vacations;

        // Get from Backend 
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        const vacations = response.data;

        // Save in global state
        const action = vacationSlice.actions.initVacations(vacations);
        store.dispatch(action);

        return vacations;
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
        const headers = { "Content-Type": "multipart/form-data" };
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

export const likesService = new LikesService();
