import {Request, Response} from 'express';
import users from '../db/users.json'
import {getGenderByUsername} from "../services/genderService";
import {getRandomUserData} from "../services/randomUserData";
import {UserType} from "../types";

export const getUsers = async (req: Request, res: Response) => {

    try {
        const sortedUsers = users.sort((a: UserType, b: UserType) => b.stepsCompleted - a.stepsCompleted);
        res.send({users: sortedUsers});
    } catch (error) {
        res.status(500).send('Error in the server' + error);
    }
}

export const saveUser = async (req: Request, res: Response) => {

    try {
        const {username, stepsCompleted} = req.body;
        if (!username || isNaN(Number(stepsCompleted))) {
            return res.status(400).json({error: 'Invalid parameters'});
        }

        // If the user exists, update the stepsCompleted
        const userIndex = users.findIndex(user => user.username === username);
        if (userIndex !== -1) {
            users[userIndex].stepsCompleted = Number(stepsCompleted);
            return res.send({updatedUser: users[userIndex]});
        } else {
            const genderRes = await getGenderByUsername(username);
            const mockData = await getRandomUserData();

            let newUser = {
                id: users.length + 1,
                username,
                stepsCompleted: Number(stepsCompleted),
                gender: genderRes ?? 'undetermined',
                email: mockData?.email ?? '',
                lastName: mockData?.lastName ?? '',
                city: mockData?.city ?? ''
            };

            users.push(newUser);
            return res.send({newUser});
        }

    } catch (e) {
        return res.status(500).json({error: 'Error in the server' + e});
    }
}
