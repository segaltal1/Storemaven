import {Request, Response} from 'express';
import {UserScoreModel} from "../models/userScoreModel";
import {UserModel} from "../models/userModel";
import mongoose from "mongoose";


export const getUsersScores = async (req: Request, res: Response) => {
    try {
        const usersScores = await UserScoreModel.aggregate([
            {
                $addFields: {
                    userIdObject: {$toObjectId: "$userId"}
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: '$userDetails'
            },
            {
                $project: {
                    username: '$userDetails.username',
                    stepsCompleted: 1
                }
            }
        ]).sort({stepsCompleted: -1}).limit(100);

        res.send({usersScores});
    } catch (error) {
        res.status(500).send('Error in the server' + error);
    }
}


export const updateUserScore = async (req: Request, res: Response) => {
    try {
        const {userId, stepsCompleted} = req.body;

        if (!userId || isNaN(Number(stepsCompleted))) {
            return res.status(400).json({error: 'Invalid parameters'});
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const objectUserId = new mongoose.Types.ObjectId(userId);

        const updatedUserScore = await UserScoreModel.findOneAndUpdate(
            {userId: objectUserId},
            {$set: {stepsCompleted}},
            {new: true, upsert: true});

        return res.send({message: 'User score updated', updatedUserScore});

    } catch (e) {
        return res.status(500).json({error: 'Error in the server' + e});
    }
}