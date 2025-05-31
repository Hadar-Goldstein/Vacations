import { Document, Schema, model } from "mongoose";
import { calculate } from "../2-utils/calculate";
import { RoleModel } from "./role-model";

// 1. Interface representing our model: 
export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleModel;
}

// 2. Schema describing model rules: 
export const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: [true, "Missing first name."],
        minlength: [2, "First name too short."],
        maxlength: [50, "First name too long."],
        trim: true,
        set: calculate.capitalizedTitle
    },
    lastName: {
        type: String,
        required: [true, "Missing last name."],
        minlength: [2, "Last name too short."],
        maxlength: [50, "Last name too long."],
        trim: true,
        set: calculate.capitalizedTitle
    },
    email: {
        type: String,
        required: [true, "Missing email."],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format."]
    },
    password: {
        type: String,
        required: [true, "Missing password."],
        minlength: [4, "Password too short."],
        maxlength: [100, "Password too long."]
    },
    role: {
        type: Number,
        required: [true, "Missing role."],
        enum: [RoleModel.Admin, RoleModel.User],
        default: RoleModel.User
    }
},
{
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

// 3. The actual model:
export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");
