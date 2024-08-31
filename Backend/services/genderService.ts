const API_URL = 'https://api.genderize.io';

type GenderApiResponseType = {
    count: number;
    name: string;
    gender: string;
    probability: number;

}

export const getGenderByUsername = async  (username: string)  => {
    try {
        const response = await fetch(`${API_URL}?name=${username}`);
        const data = await response.json() as GenderApiResponseType;
        return data.probability > 0.95 ? data.gender : 'undetermined';
    } catch (error) {
        console.error('Error fetching', error);
    }
}