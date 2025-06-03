import { IVacationModel, VacationModel } from "../3-models/vacation-model";


class DataService {

    public getAllVacation(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
    }


    public addVacation(): Promise<IVacationModel[]> {
       
    }



}

export const dataService = new DataService();
