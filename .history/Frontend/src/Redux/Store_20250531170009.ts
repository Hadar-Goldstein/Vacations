import { configureStore } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { userSlice } from "./UserSlice";
import { VacationModel } from "../Models/VacationModel";
import { VacationSlice } from "./VacationSlice";

// Create AppState - entire app state
export type AppState = {
    vacations: VacationModel[];
    user: UserModel;
};

// Create store object
export const store = configureStore<AppState>({
    reducer: {
        vacations: VacationSlice.reducer, // Tell Redux which reducer handle products
        user: userSlice.reducer
    }
});