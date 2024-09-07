import {Request, Response} from 'express';
import {getGenderByUsername} from "../services/genderService";
import {getRandomUserData} from "../services/randomUserData";
import {UserModel} from "../models/userModel";
import {UserScoreModel} from "../models/userScoreModel";


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

        const createdUser = await UserModel.create(newUser);
        await UserScoreModel.create({userId: createdUser._id, stepsCompleted: 0});

        return res.send({createdUser});

    } catch (e) {
        return res.status(500).json({error: 'Error in the server' + e});
    }
}

