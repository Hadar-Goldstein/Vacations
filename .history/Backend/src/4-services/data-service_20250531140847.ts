

class DataService {

    public getAllCategories(): Promise<ICategoryModel[]> {
        return CategoryModel.find().exec();
    }

    public getAllProductsByCategoryId(categoryId: string): Promise<IProductModel[]> {
        return ProductModel.find({categoryId: {$eq: categoryId}}).populate("category").exec();
    }


}

export const dataService = new DataService();
