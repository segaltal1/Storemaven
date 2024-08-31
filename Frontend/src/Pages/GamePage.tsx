import React, {useEffect, useState} from 'react';
import {Header} from "../Components/Header";
import {useAppContext} from "../MainContext/AppContext";
import {Loader} from "../Components/Loader";
import {Shape} from "../Components/Shape";
import {FloatingMessage} from "../Components/FloatingMessage";
import {INDICATOR_KEYS} from "../Helpers/consts";
import {DirectionTypes} from "../Helpers/types";

export const GamePage = () => {
    const {
        gameState,
        setGameState,
        shapeDirection,
        finalMessage,
        setFinalMessage
    } = useAppContext();

    const [isTypedAnyKey, setIsTypedAnyKey] = useState(false);


    const handleUserChoice = (userDirectionChoice: DirectionTypes) => {
        if (gameState === 'Playing') {
            if (userDirectionChoice === shapeDirection) {
                setFinalMessage('Success');
            } else {
                setFinalMessage('Wrong key');
            }
            setGameState('GameOver');
        }

    }

    const handleKeyDown = (e: KeyboardEvent) => {
        setIsTypedAnyKey(true);

        if (gameState === 'Loading') {
            setFinalMessage('Too soon');
            setGameState('GameOver');
            return;
        }

        handleUserChoice(e.key === INDICATOR_KEYS.right ? 'right' : 'left')
    }

    useEffect(() => {
        setGameState('Loading')
    }, [])


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        if (gameState === 'GameOver' && !isTypedAnyKey) {
            setFinalMessage('Too late')
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [gameState, shapeDirection, isTypedAnyKey])

    useEffect(() => {
        if (gameState === 'GameOver') {
            setTimeout(() => {
                setGameState('Loading')
                setIsTypedAnyKey(false)
                console.log('Resetting game')
            }, 2000)
        }

    }, [gameState])

    return (
        <section className="page-layout d-flex flex-col align-items-center gap-3">
            <Header/>
            {gameState === 'Loading' && <Loader/>}
            {gameState === 'Playing' && <Shape/>}
            {
                (gameState === 'GameOver' || gameState === 'Loading' && finalMessage)
                && <FloatingMessage
                    msg={finalMessage}
                    variant={finalMessage === 'Success' ? 'success' : 'error'}
                />
            }
        </section>

    )
};

