export type UserType = {
    username: string;
    gender:  string;
    email?: string;
    lastName?: string;
    city?: string;
}

export type UserScoreType = {
    username: string;
    stepsCompleted: number;
}