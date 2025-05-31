// Handling entire products at application level 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

// Init products 
export function initProducts(_currentState: ProductModel[], action: PayloadAction<ProductModel[]>) :ProductModel[] {
    const productsToInit = action.payload; // Take products to init 
    const newState = productsToInit; // Create new state as those products
    return newState; // Return new state
}



// Add product 
export function AddProduct(currentState: ProductModel[], action: PayloadAction<ProductModel>) :ProductModel[] {
    const productToAdd = action.payload; // Take product to add
    const newState = [...currentState]; // Duplicate current state into new state
    newState.push(productToAdd); // Add product to the new state
    return newState; // Return the new state
}

// Update product 
export function updateProduct(currentState:ProductModel[], action: PayloadAction<ProductModel>) :ProductModel[] {
    const productToUpdate = action.payload; // Take product to edit
    const newState = [...currentState]; // Duplicate current state into new state
    const index = newState.findIndex(p => p.id === productToUpdate.id); // Find product index to update
    newState[index] = productToUpdate; // Update
    return newState; // Return the new state
}


// Delete product
export function deleteProduct(currentState:ProductModel[], action: PayloadAction<number>) :ProductModel[] {
    const idToDelete = action.payload; // Take product id to delete
    const newState = [...currentState]; // Duplicate current state into new state
    const index = newState.findIndex(p => p.id === idToDelete);// Find product index to delete
    newState.splice(index, 1); // Delete
    return newState; // Return the new state
}

// Create slice
export const productSlice = createSlice({
    name: "products", // Name for the data of this slice
    initialState: [], // Initial data for this slice
    reducers: {initProducts, AddProduct, updateProduct, deleteProduct} // All the above reducers
});