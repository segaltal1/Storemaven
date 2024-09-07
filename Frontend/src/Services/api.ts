const API_URL = 'http://localhost:3000/api'

type ResponseType = {
    createdUser: {
        username: string;
        _id: string;
    }
}
const saveUsername = async (username: string): Promise<ResponseType> => {

    try {
        const response = await fetch(API_URL + '/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
            })
        });

        if (!response.ok) {
            throw new Error('Error occurred while creating user');
        }
        return await response.json();
    } catch (e) {
        console.log(e, 'error occurred while creating user');
    }
}

const updateUserScore = async (userId: string, stepsCompleted: number) => {
    try {
        const response = await fetch(API_URL + '/update-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                stepsCompleted,
            }),
        });
        if (!response.ok) {
            throw new Error('Error occurred while updating user score');
        }
        return await response.json();
    } catch (e) {
        console.log(e, 'error occurred while updating user score');
    }
}


export const ApiService = {
    saveUsername,
    updateUserScore
}
