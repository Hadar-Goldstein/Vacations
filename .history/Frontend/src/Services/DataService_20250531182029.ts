import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { VacationModel } from "../Models/VacationModel";
import { vacationSlice } from "../Redux/VacationSlice";

class DataService {
	public async getAllVacations(): Promise<VacationModel[]> {
        // Check global state
        if(store.getState().vacations.length > 0) return store.getState().vacations;

        // Get from Backend 
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        const vacations = response.data;

        // Save in global state
        const action = vacationSlice.actions.initVacations(vacations); 
        store.dispatch(action);

        return vacations;
    }

    public async addVacation(vacation: v) :Promise<void>{

        // get --> get data from server
        // post --> add new data to server 
        // put --> update full existing data in server
        // patch --> update partial existing data in server
        // delete --> delete existing data from server

        const headers = {"Content-Type": "multipart/form-data"};

        // Send product to server
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, { headers });

        // Extract the added product
        const dbProduct = response.data;

        // Add dbProduct to App state
        const action = productSlice.actions.AddProduct(dbProduct);
        store.dispatch(action);
    }

    public async deleteProduct(id: number) :Promise<void> {

        // Delete product from backend
        await axios.delete(appConfig.productsUrl + id);

        const action = productSlice.actions.deleteProduct(id);
        store.dispatch(action);
    }

    public async updateProduct(product: ProductModel) :Promise<void> {

        const headers = {"Content-Type": "multipart/form-data"};

        // Send product to server
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, { headers });

        
        // Extract the added product
        const dbProduct = response.data;

        // alert(JSON.stringify(dbProduct));

        const action = productSlice.actions.updateProduct(dbProduct);
        store.dispatch(action);
    }

    public async top3Products() : Promise<ProductModel[]> {
        const response = await axios.get<ProductModel[]>(appConfig.top3ProductsUrl);
        const products = response.data;
        return products;
    }

}

export const dataService = new DataService();
