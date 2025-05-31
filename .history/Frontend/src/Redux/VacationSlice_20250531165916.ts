// Handling entire Vacations at application level 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

// Init Vacations 
export function initVacations(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>) :VacationModel[] {
    const vacationsToInit = action.payload; // Take Vacations to init 
    const newState = vacationsToInit; // Create new state as those Vacations
    return newState; // Return new state
}

export function AddVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>) :VacationModel[] {
    const vacationToAdd = action.payload; // Take Vacation to add
    const newState = [...currentState]; // Duplicate current state into new state
    newState.push(vacationToAdd); // Add Vacation to the new state
    return newState; // Return the new state
}

export function updateVacation(currentState:VacationModel[], action: PayloadAction<VacationModel>) :VacationModel[] {
    const vacationToUpdate = action.payload; 
    const newState = [...currentState]; 
    const index = newState.findIndex(v => v._id === vacationToUpdate._id); 
    newState[index] = vacationToUpdate; 
    return newState; 
}

export function deleteVacation(currentState:VacationModel[], action: PayloadAction<string>) :VacationModel[] {
    const _idToDelete = action.payload; 
    const newState = [...currentState]; 
    const index = newState.findIndex(v => v._id === _idToDelete);
    newState.splice(index, 1); 
    return newState; 
}

export const VacationSlice = createSlice({
    name: "vacations", 
    initialState: [], 
    reducers: {initVacations, AddVacation, updateVacation, deleteVacation} 
});