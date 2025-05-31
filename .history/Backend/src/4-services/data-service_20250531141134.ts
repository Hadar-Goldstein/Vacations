import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";


class DataService {

    public getAllVacation(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
    }


    public addVacation(vacation: IVacationModel): Promise<IVacationModel[]> {
        const error = vacation.validateSync();
        if (error) throw new ClientError(StatusCode.BadRequest, error.message);
        return vacation.save();
    }



}

export const dataService = new DataService();
