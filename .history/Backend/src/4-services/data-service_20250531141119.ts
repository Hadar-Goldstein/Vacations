import { IVacationModel, VacationModel } from "../3-models/vacation-model";


class DataService {

    public getAllVacation(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
    }


    public addVacation(vacation: IVacationModel): Promise<IVacationModel[]> {
        const error = meeting.validateSync();
        if (error) throw new ClientError(StatusCode.BadRequest, error.message);
        return meeting.save();
    }



}

export const dataService = new DataService();
