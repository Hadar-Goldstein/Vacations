import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import { IProductModel, ProductModel } from "../3-models/product-model";

class DataService {

    public getAllCategories(): Promise<ICategoryModel[]> {
        return CategoryModel.find().exec();
    }

    public getAllProductsByCategoryId(categoryId: string): Promise<IProductModel[]> {
        return ProductModel.find({categoryId: {$eq: categoryId}}).populate("category").exec();
    }


}

export const dataService = new DataService();
