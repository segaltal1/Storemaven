import React, {createContext, ReactNode, useContext, useState} from 'react';
import {DirectionTypes, UserType} from "../Helpers/types";

type GameStatus = 'Loading' | 'Playing' | 'GameOver' | null;

interface AppContextType {
    gameState: GameStatus;
    setGameState: (value: GameStatus) => void;
    shapeDirection: DirectionTypes;
    setShapeDirection: (value: DirectionTypes) => void;
    finalMessage: string;
    setFinalMessage: (value: string) => void;
    userObject: UserType | null;
    setUserObject: (value: UserType) => void;
    userScore: number;
    setUserScore: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [gameState, setGameState] = useState<GameStatus>(null);
    const [userObject, setUserObject] = useState<UserType | null>(null);
    const [shapeDirection, setShapeDirection] = useState<DirectionTypes | null>(null);
    const [finalMessage, setFinalMessage] = useState<string>('');
    const [userScore, setUserScore] = useState<number>(0);


    const contextObject = {
        gameState,
        setGameState,
        shapeDirection,
        setShapeDirection,
        finalMessage,
        setFinalMessage,
        userObject,
        setUserObject,
        userScore,
        setUserScore
    }

    return (
        <AppContext.Provider value={contextObject}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
}