import { configureStore } from "@reduxjs/toolkit";
import { LikeObjModel } from "../Models/LikeObjModel";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { likeSlice } from "./LikesSlice";
import { userSlice } from "./UserSlice";
import { vacationSlice } from "./VacationSlice";

export type AppState = {
    vacations: VacationModel[];
    user: UserModel;
    likes: LikeObjModel[];
};

export const store = configureStore<AppState>({
    reducer: {
        vacations: vacationSlice.reducer, 
        user: userSlice.reducer,
        likes: likeSlice.reducer
    }
});