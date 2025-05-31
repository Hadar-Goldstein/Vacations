import { configureStore } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { userSlice } from "./UserSlice";
import { VacationModel } from "../Models/VacationModel";

// Create AppState - entire app state
export type AppState = {
    vacations: VacationModel[];
    user: UserModel;
};

// Create store object
export const store = configureStore<AppState>({
    reducer: {
        vacations: productSlice.reducer, // Tell Redux which reducer handle products
        user: userSlice.reducer
    }
});