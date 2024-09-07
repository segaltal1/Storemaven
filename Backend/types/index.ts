import mongoose from "mongoose";

export type UserType = {
    username: string;
    gender: string;
    email?: string;
    lastName?: string;
    city?: string;
}

export type UserScoreType = {
    userId: mongoose.Schema.Types.ObjectId;
    stepsCompleted: number;
}