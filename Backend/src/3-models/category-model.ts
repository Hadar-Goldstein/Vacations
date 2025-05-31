import mongoose, { Document, ObjectId, Schema, model } from "mongoose";

// 1. Interface representing our model: 
export interface ICategoryModel extends Document {
    name: string;
}

// 2. Schema describing model rules: 
export const CategorySchema = new Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "Missing name."],
        minlength: [2, "Name too short."],
        maxlength: [50, "Name too long"],
        trim: true
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

// 3. The actual model:
export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "categories");
