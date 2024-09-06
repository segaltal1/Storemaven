import {Request, Response} from 'express';
import {getGenderByUsername} from "../services/genderService";
import {getRandomUserData} from "../services/randomUserData";
import {UserModel} from "../models/userModel";
import {UserScoreModel} from "../models/userScoreModel";


export const getUsersScores = async (req: Request, res: Response) => {

    try {
        const usersScores = await UserScoreModel.find()
            .sort({stepsCompleted: -1})
            .limit(100)

        res.send({usersScores});
    } catch (error) {
        res.status(500).send('Error in the server' + error);
    }
}

export const createUser = async (req: Request, res: Response) => {

    try {
        const {username} = req.body;
        if (!username) {
            return res.status(400).json({error: 'Invalid parameters'});
        }

        const existingUser = await UserModel.findOne({username});
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }


        const genderRes = await getGenderByUsername(username);
        const mockData = await getRandomUserData();

        let newUser = {
            username,
            gender: genderRes ?? 'undetermined',
            email: mockData?.email ?? '',
            lastName: mockData?.lastName ?? '',
            city: mockData?.city ?? ''
        };

        await UserModel.create(newUser);
        await UserScoreModel.create({username, stepsCompleted: 0});

        return res.send({newUser});

    } catch (e) {
        return res.status(500).json({error: 'Error in the server' + e});
    }
}

export const updateUserScore = async (req: Request, res: Response) => {
    try {
        const {userId, stepsCompleted} = req.body;

        if (!userId|| isNaN(Number(stepsCompleted))) {
            return res.status(400).json({error: 'Invalid parameters'});
        }

        const updatedUserCore = await UserScoreModel.findByIdAndUpdate(userId, {stepsCompleted});
        if (!updatedUserCore) {
            return res.status(404).json({error: 'User not found'});
        }

        return res.send({message: 'User score updated', updatedUserCore});
    } catch (e) {
        return res.status(500).json({error: 'Error in the server' + e});
    }
}