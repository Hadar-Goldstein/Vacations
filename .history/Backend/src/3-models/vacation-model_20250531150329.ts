import { Document, Schema, model } from "mongoose";
import { calculate } from "../2-utils/calculate";

// 1. Interface representing our model: 
export interface IVacationModel extends Document {
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: Number;
    imageFileName: string;
}

// 2. Schema describing model rules: 
export const VacationSchema = new Schema<IVacationModel>({
    destination: {
        type: String,
        required: [true, "Missing destination."],
        minlength: [2, "Destination too short."],
        maxlength: [50, "Destination too long"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Missing description."],
        minlength: [50, "Description too short."],
        maxlength: [500, "Description too long"],
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, "Missing start date."],
        validate: [
            {
                validator: (value: Date) => value instanceof Date && !isNaN(value.getTime()),
                message: "Invalid start date."
            },
            {
                validator: (value: Date) => value >= new Date(),
                message: "Start date cannot be in the past."
            }],
        trim: true
    },
    endDate: {
        type: Date,
        required: [true, "Missing end date."],
        validate: [
            {
                validator: (value: Date) => value instanceof Date && !isNaN(value.getTime()),
                message: "Invalid end date."
            },
            {
                validator: function (this: IVacationModel, value: Date) {
                    return this.startDate < value;
                },
                message: "End date must be after start date."
            }
        ],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price can't be negative."],
        max: [10000, "Price can't exceed 10,000."]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

VacationSchema.pre("save", function (this: IVacationModel, next) {
    if (this.isModified("destination")) {
        this.destination = calculate.toTitleCase(this.destination);
    }
    next();
});


// 3. The actual model:
export const VacationModel = model<IVacationModel>("VacationModel", VacationSchema, "vacations");
