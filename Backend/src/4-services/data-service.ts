import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";


class DataService {

    public getAllVacation(): Promise<IVacationModel[]> {
        return VacationModel.find().populate("likes").exec();
    }

    public getVacationById(_id: string): Promise<IVacationModel> {
        return VacationModel.findById(_id).populate("likes").exec();
    }

    public async addVacation(vacation: IVacationModel): Promise<IVacationModel> {
        const error = vacation.validateSync();
        if (error) throw new ClientError(StatusCode.BadRequest, error.message);

        return vacation.save();
    }

    public async updateVacation(vacation: IVacationModel): Promise<IVacationModel> {
        const error = vacation.validateSync()
        if (error) throw new ClientError(StatusCode.BadRequest, error.message);
        const dbVacation = await VacationModel.findByIdAndUpdate(vacation._id, vacation, { returnOriginal: false }).exec();
        if (!dbVacation) throw new ClientError(StatusCode.NotFound, `Vacation ${vacation._id} does not exist`);
        return dbVacation;
    }

    public async deleteVacation(_id: string): Promise<void> {
        const dbVacation = await VacationModel.findByIdAndDelete(_id).exec();
        if (!dbVacation) throw new ClientError(StatusCode.NotFound, `Vacation ${_id} does not exist.`);
    }


    public async getImageName(_id: string): Promise<string> {
        const vacation = await VacationModel.findById(_id);
        if (!vacation) return null;
        const imageFileName = vacation.imageFileName;
        return imageFileName;
    }

    public async getRandomImages() {
        const vacations = await VacationModel.find().exec();
        const randoms = [];
        for (let i = 1; i <= 3; i++) {
            const randomIndex = Math.floor(Math.random() * vacations.length);
            const imgUrl = vacations[randomIndex].imageUrl;
            randoms.push(imgUrl);
            vacations.splice(randomIndex, 1);
        }
        return randoms;
    }

}



export const dataService = new DataService();
