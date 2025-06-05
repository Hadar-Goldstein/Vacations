import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikeObjModel } from "../Models/LikeObjModel";

export function initLikes(_currentState: LikeObjModel[], action: PayloadAction<LikeObjModel[]>) :LikeObjModel[] {
    const LikesToInit = action.payload;
    const newState = LikesToInit; 
    return newState; 
}

// export function AddLike(currentState: LikeModel[], action: PayloadAction<LikeModel>) :LikeModel[] {
//     const LikeToAdd = action.payload; 
//     const newState = [...currentState]; 
//     newState.push(LikeToAdd); 
//     return newState; 
// }

// export function removeLike(currentState:LikeModel[], action: PayloadAction<string>) :LikeModel[] {
//     const _id = action.payload; 
//     const newState = [...currentState]; 
//     const index = newState.findIndex(l => l._id === _id);
//     newState.splice(index, 1); 
//     return newState; 
// }

export const likeSlice = createSlice({
    name: "likes", 
    initialState: [], 
    reducers: {initLikes} 
});