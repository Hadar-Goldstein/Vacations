import { configureStore } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { userSlice } from "./UserSlice";
import { VacationModel } from "../Models/VacationModel";
import { vacationSlice } from "./VacationSlice";
import { LikeModel } from "../Models/LikeModel";
import { likeSlice, LikeSlice } from "./LikesSlice";

export type AppState = {
    vacations: VacationModel[];
    user: UserModel;
    likes: LikeModel[];
};

export const store = configureStore<AppState>({
    reducer: {
        vacations: vacationSlice.reducer, 
        user: userSlice.reducer,
        likes: likeSlice
    }
});