const API_URL = 'https://randomuser.me/api';

type RandomUser = {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: number;
        coordinates: {
            latitude: string;
            longitude: string;
        };
    };
    email: string;

}

type RandomUserDataResponse = {
    results: RandomUser [];
}

type ResponseType =  {
    email: RandomUser['email'];
    lastName: RandomUser['name']['last'];
    city: RandomUser['location']['city'];
};

export const getRandomUserData = async (): Promise<ResponseType | undefined> => {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json() as RandomUserDataResponse;
        const randomUser = data.results[0];
        return {
            email: randomUser.email || '',
            lastName: randomUser.name.last || '',
            city: randomUser.location.city || '',
        }

    } catch (error) {
        console.error('Error fetching', error);
    }
}