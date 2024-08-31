import {DirectionTypes} from "./types";

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomDirection = (): DirectionTypes => {
    return Math.random() >= 0.5 ? 'left' : 'right';
}