import React, {createContext, ReactNode, useContext, useState} from 'react';
import {DirectionTypes} from "../Helpers/types";

type GameStatus = 'Loading' | 'Playing' | 'GameOver' | null;

interface AppContextType {
    gameState: GameStatus;
    setGameState: (value: GameStatus) => void;
    username: string;
    setUsername: (value: string) => void;
    shapeDirection: DirectionTypes;
    setShapeDirection: (value: DirectionTypes) => void;
    finalMessage: string;
    setFinalMessage: (value: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [gameState, setGameState] = useState<GameStatus>(null);
    const [username, setUsername] = useState<string>('');
    const [shapeDirection, setShapeDirection] = useState<DirectionTypes | null>(null);
    const [finalMessage, setFinalMessage] = useState<string>('');


    const contextObject = {
        username,
        setUsername,
        gameState,
        setGameState,
        shapeDirection,
        setShapeDirection,
        finalMessage,
        setFinalMessage
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