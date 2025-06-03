import { VacationModel } from "../3-models/vacation-model";


class DataService {

    public getAllVacation(): Promise<ICategoIryModel[]> {
        return VacationModel.find().exec();
    }

    public getAllProductsByCategoryId(categoryId: string): Promise<IProductModel[]> {
        return ProductModel.find({categoryId: {$eq: categoryId}}).populate("category").exec();
    }


}

export const dataService = new DataService();
