import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { UserModel } from "./user-model";
import { VacationModel } from "./vacation-model";

// 1. Interface representing our model: 
export interface ILikeModel extends Document {
    userId: ObjectId;
    vacationId: ObjectId;
}

// 2. Schema describing model rules: 
export const LikeSchema = new Schema<ILikeModel>({
    userId: {
        type: mongoose.Schema.ObjectId,
        req
    },
    vacationId: {
        type: mongoose.Schema.ObjectId
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

LikeSchema.virtual("vacation", {
    ref: VacationModel,
    localField: "vacationId",
    foreignField: "_id",
    justOne: true
});

LikeSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
})


// 3. The actual model:
export const LikeModel = model<ILikeModel>("LikeModel", LikeSchema, "likes");
