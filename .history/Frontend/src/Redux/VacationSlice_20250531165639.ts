// Handling entire s at application level 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model } from "../Models/Model";

// Init s 
export function inits(_currentState: Model[], action: PayloadAction<Model[]>) :Model[] {
    const sToInit = action.payload; // Take s to init 
    const newState = sToInit; // Create new state as those s
    return newState; // Return new state
}



// Add  
export function Add(currentState: Model[], action: PayloadAction<Model>) :Model[] {
    const ToAdd = action.payload; // Take  to add
    const newState = [...currentState]; // Duplicate current state into new state
    newState.push(ToAdd); // Add  to the new state
    return newState; // Return the new state
}

// Update  
export function update(currentState:Model[], action: PayloadAction<Model>) :Model[] {
    const ToUpdate = action.payload; // Take  to edit
    const newState = [...currentState]; // Duplicate current state into new state
    const index = newState.findIndex(p => p.id === ToUpdate.id); // Find  index to update
    newState[index] = ToUpdate; // Update
    return newState; // Return the new state
}


// Delete 
export function delete(currentState:Model[], action: PayloadAction<number>) :Model[] {
    const idToDelete = action.payload; // Take  id to delete
    const newState = [...currentState]; // Duplicate current state into new state
    const index = newState.findIndex(p => p.id === idToDelete);// Find  index to delete
    newState.splice(index, 1); // Delete
    return newState; // Return the new state
}

// Create slice
export const Slice = createSlice({
    name: "s", // Name for the data of this slice
    initialState: [], // Initial data for this slice
    reducers: {inits, Add, update, delete} // All the above reducers
});