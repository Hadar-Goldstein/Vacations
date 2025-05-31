import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";


class DataService {

    public getAllVacation(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
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
        const dbVacation = VacationModel.findByIdAndDelete(_id).exec();
        if (!dbVacation) throw new ClientError(StatusCode.NotFound, `Vacation ${_id} does not exist.`);
    }

    
    public async getImageName(id:number) :Promise<string> {
        const sql = "select imageName from products where id=?";
        const values = [id];
        const products = await dal.execute(sql, values);
        const product = products[0];
        if(!product) return null;
        return product.imageName;
    }

}

export const dataService = new DataService();
