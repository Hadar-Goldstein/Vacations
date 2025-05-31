import { configureStore } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel"
import { productSlice } from "./ProductSlice";
import { UserModel } from "../Models/UserModel";
import { userSlice } from "./UserSlice";

// Create AppState - entire app state
export type AppState = {
    products: ProductModel[];
    user: UserModel;
};

// Create store object
export const store = configureStore<AppState>({
    reducer: {
        products: productSlice.reducer, // Tell Redux which reducer handle products
        user: userSlice.reducer
    }
});