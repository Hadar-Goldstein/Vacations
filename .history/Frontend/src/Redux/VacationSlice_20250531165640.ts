// Handling entire Vs at application level 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VModel } from "../Models/VModel";

// Init Vs 
export function initVs(_currentState: VModel[], action: PayloadAction<VModel[]>) :VModel[] {
    const VsToInit = action.payload; // Take Vs to init 
    const newState = VsToInit; // Create new state as those Vs
    return newState; // Return new state
}



// Add V 
export function AddV(currentState: VModel[], action: PayloadAction<VModel>) :VModel[] {
    const VToAdd = action.payload; // Take V to add
    const newState = [...currentState]; // Duplicate current state into new state
    newState.push(VToAdd); // Add V to the new state
    return newState; // Return the new state
}

// Update V 
export function updateV(currentState:VModel[], action: PayloadAction<VModel>) :VModel[] {
    const VToUpdate = action.payload; // Take V to edit
    const newState = [...currentState]; // Duplicate current state into new state
    const index = newState.findIndex(p => p.id === VToUpdate.id); // Find V index to update
    newState[index] = VToUpdate; // Update
    return newState; // Return the new state
}


// Delete V
export function deleteV(currentState:VModel[], action: PayloadAction<number>) :VModel[] {
    const idToDelete = action.payload; // Take V id to delete
    const newState = [...currentState]; // Duplicate current state into new state
    const index = newState.findIndex(p => p.id === idToDelete);// Find V index to delete
    newState.splice(index, 1); // Delete
    return newState; // Return the new state
}

// Create slice
export const VSlice = createSlice({
    name: "Vs", // Name for the data of this slice
    initialState: [], // Initial data for this slice
    reducers: {initVs, AddV, updateV, deleteV} // All the above reducers
});