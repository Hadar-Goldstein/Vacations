import mongoose, { Document, ObjectId, Schema, model } from "mongoose";

// 1. Interface representing our model: 
export interface IVacationModel extends Document {
    destination: string;
    description: Date;
    startDate: Date;
    endDate: ObjectId;
    price: Number;
    imageFileName: string;
}

// 2. Schema describing model rules: 
export const VacationSchema = new Schema<IVacationModel>({
    name: {
        type: String,
        required: [true, "Missing name."],
        minlength: [2, "Name too short."],
        maxlength: [50, "Name too long"],
        trim: true
    },
    createdAt: {
        type: Date,
        required: [true, "Missing creation date."],
        validate: [
            {
                validator: (value: Date) => value instanceof Date && !isNaN(value.getTime()),
                message: "Invalid creation date."
            },
            {
                validator: (value: Date) => value <= new Date(),
                message: "Creation date cannot be in the future."
            }],
        trim: true
    },
    expiresAt: {
        type: Date,
        required: [true, "Missing expiration date."],
        validate: [
            {
                validator: (value: Date) => value instanceof Date && !isNaN(value.getTime()),
                message: "Invalid expiration date."
            },
            {
                validator: (value: Date) => value > new Date(),
                message: "Expiration date must be in the future."
            }],
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.ObjectId
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price can't be negative."],
        max: [1000, "Price can't exceed 1,000."]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

VacationSchema.virtual("category", {
    ref: CategoryModel,
    localField:"categoryId",
    foreignField: "_id",
    justOne: true
})

// 3. The actual model:
export const VacationModel = model<IVacationModel>("VacationModel", VacationSchema, "vacations");
