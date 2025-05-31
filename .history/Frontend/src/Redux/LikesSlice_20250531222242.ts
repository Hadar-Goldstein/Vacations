import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model } from "../Models/Model";

export function inits(_currentState: Model[], action: PayloadAction<Model[]>) :Model[] {
    const sToInit = action.payload;
    const newState = sToInit; 
    return newState; 
}

export function Add(currentState: Model[], action: PayloadAction<Model>) :Model[] {
    const ToAdd = action.payload; 
    const newState = [...currentState]; 
    newState.push(ToAdd); 
    return newState; 
}

export function update(currentState:Model[], action: PayloadAction<Model>) :Model[] {
    const ToUpdate = action.payload; 
    const newState = [...currentState]; 
    const index = newState.findIndex(v => v._id === ToUpdate._id); 
    newState[index] = ToUpdate; 
    return newState; 
}

export function delete(currentState:Model[], action: PayloadAction<string>) :Model[] {
    const _idToDelete = action.payload; 
    const newState = [...currentState]; 
    const index = newState.findIndex(v => v._id === _idToDelete);
    newState.splice(index, 1); 
    return newState; 
}

export const Slice = createSlice({
    name: "s", 
    initialState: [], 
    reducers: {inits, Add, update, delete} 
});