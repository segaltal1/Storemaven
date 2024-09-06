import mongoose, {Document, Schema} from "mongoose";
import {UserScoreType} from "../types";


type UserScoreModelType = Document & UserScoreType;

const userScoreSchema = new Schema<UserScoreModelType>({
    username: {type: String, required: true},
    stepsCompleted: {type: Number, required: true},
},{versionKey: false});

export const UserScoreModel = mongoose.model<UserScoreModelType>('UserScore', userScoreSchema);