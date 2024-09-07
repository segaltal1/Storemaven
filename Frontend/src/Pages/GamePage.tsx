import React, {useEffect, useMemo, useState} from 'react';
import {Header} from "../Components/Header";
import {useAppContext} from "../MainContext/AppContext";
import {Loader} from "../Components/Loader";
import {Shape} from "../Components/Shape";
import {FloatingMessage} from "../Components/FloatingMessage";
import {INDICATOR_KEYS} from "../Helpers/consts";
import {DirectionTypes} from "../Helpers/types";
import {ApiService} from "../Services/api";

export const GamePage = () => {
    const {
        gameState,
        setGameState,
        shapeDirection,
        finalMessage,
        setFinalMessage,
        userScore,
        setUserScore,
        userObject
    } = useAppContext();

    const [isTypedAnyKey, setIsTypedAnyKey] = useState(false);


    const handleUserChoice = (userDirectionChoice: DirectionTypes) => {
        if (gameState === 'Playing') {
            if (userDirectionChoice === shapeDirection) {
                setFinalMessage('Success');
                setUserScore(userScore + 1);
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

        if (e.key === INDICATOR_KEYS.right) {
            handleUserChoice('right')
        } else if (e.key === INDICATOR_KEYS.left) {
            handleUserChoice('left')
        }
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
    }, [gameState, shapeDirection, isTypedAnyKey, userScore])

    useEffect(() => {
        if (gameState === 'GameOver') {
            setTimeout(() => {
                setGameState('Loading')
                setIsTypedAnyKey(false)
                console.log('Resetting game')
            }, 2000)
        }

    }, [gameState])

    useEffect(() => {
        console.log('userScore changed', {
            userObject,
            userScore
        })
        if (userObject) {
            ApiService.updateUserScore(userObject.userId, userScore)
        }

    }, [userScore, userObject])

    const isShowFloatingMessage = useMemo(() => {
        return gameState === 'GameOver' || gameState === 'Loading' && finalMessage
    }, [gameState, finalMessage])


    return (
        <section className="page-layout d-flex flex-col align-items-center gap-3">
            <Header/>
            {gameState === 'Loading' && <Loader/>}
            {gameState === 'Playing' && <Shape/>}
            {
                isShowFloatingMessage && <FloatingMessage
                    msg={finalMessage}
                    variant={finalMessage === 'Success' ? 'success' : 'error'}
                />
            }
        </section>

    )
};

