import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikeModel } from "../Models/LikeModel";

export function initLikes(_currentState: LikeModel[], action: PayloadAction<LikeModel[]>) :LikeModel[] {
    const LikesToInit = action.payload;
    const newState = LikesToInit; 
    return newState; 
}

export function AddLike(currentState: LikeModel[], action: PayloadAction<LikeModel>) :LikeModel[] {
    const LikeToAdd = action.payload; 
    const newState = [...currentState]; 
    newState.push(LikeToAdd); 
    return newState; 
}

export function removeLike(currentState:LikeModel[], action: PayloadAction<string>) :LikeModel[] {
    const userIdToDelete = action.payload; 
    const newState = [...currentState]; 
    const index = newState.findIndex(v => v._id === _idToDelete);
    newState.splice(index, 1); 
    return newState; 
}

export const LikeSlice = createSlice({
    name: "Likes", 
    initialState: [], 
    reducers: {initLikes, AddLike, updateLike, deleteLike} 
});