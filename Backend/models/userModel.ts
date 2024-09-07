import mongoose, {Document, Schema} from "mongoose";
import {UserType} from "../types";

type UserModelType = Document & UserType;

const userSchema = new Schema<UserModelType>({
    username: {type: String, required: true},
    gender: {type: String, required: true},
    email: {type: String},
    lastName: {type: String},
    city: {type: String},
},{versionKey: false});

export const UserModel = mongoose.model<UserModelType>('User', userSchema);