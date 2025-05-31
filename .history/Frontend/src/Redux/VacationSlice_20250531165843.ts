// Handling entire Vacations at application level 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

// Init Vacations 
export function initVacations(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>) :VacationModel[] {
    const vacationsToInit = action.payload; // Take Vacations to init 
    const newState = vacationsToInit; // Create new state as those Vacations
    return newState; // Return new state
}



// Add Vacation 
export function AddVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>) :VacationModel[] {
    const vacationToAdd = action.payload; // Take Vacation to add
    const newState = [...currentState]; // Duplicate current state into new state
    newState.push(vacationToAdd); // Add Vacation to the new state
    return newState; // Return the new state
}

// Update Vacation 
export function updateVacation(currentState:VacationModel[], action: PayloadAction<VacationModel>) :VacationModel[] {
    const vacationToUpdate = action.payload; // Take Vacation to edit
    const newState = [...currentState]; // Duplicate current state into new state
    const index = newState.findIndex(v => v._id === vacationToUpdate._id); // Find Vacation index to update
    newState[index] = vacationToUpdate; // Update
    return newState; // Return the new state
}


// Delete Vacation
export function deleteVacation(currentState:VacationModel[], action: PayloadAction<string>) :VacationModel[] {
    const _idToDelete = action.payload; // Take Vacation id to delete
    const newState = [...currentState]; // Duplicate current state into new state
    const index = newState.findIndex(v => v._id === _idToDelete);// Find Vacation index to delete
    newState.splice(index, 1); // Delete
    return newState; // Return the new state
}

// Create slice
export const VacationSlice = createSlice({
    name: "Vacations", // Name for the data of this slice
    initialState: [], // Initial data for this slice
    reducers: {initVacations, AddVacation, updateVacation, deleteVacation} 
});