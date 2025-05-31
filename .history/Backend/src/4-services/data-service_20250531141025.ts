import { IVacationModel, VacationModel } from "../3-models/vacation-model";


class DataService {

    public getAllVacation(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
    }


    public addVacation(vacation: IVacationModel): Promise<IVacationModel[]> {
       const 
    }



}

export const dataService = new DataService();
