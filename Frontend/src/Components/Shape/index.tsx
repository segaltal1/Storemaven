import styles from './style.module.scss'
import {getRandomDirection, getRandomNumber} from "../../Helpers/utils";
import {useEffect, useState} from "react";
import {useAppContext} from "../../MainContext/AppContext";

type Position = {
    left: number,
    top: number
}

const SHAPE_APPEARANCE_TIME = 1000;

export const Shape = () => {
    const [position, setPosition] = useState<Position>({top: 0, left: 0})
    const {setShapeDirection, setGameState} = useAppContext();

    useEffect(() => {
        const direction = getRandomDirection()
        setShapeDirection(direction)

        setPosition({
            top: getRandomNumber(0, 100),
            left: direction === 'left' ? 5 : 90
        })

        setTimeout(() => {
            setGameState('GameOver')
        }, SHAPE_APPEARANCE_TIME)

    }, [])


    return (
        <div className={styles.shape}
             style={{
                 top: `${position.top}%`,
                 left: `${position.left}%`
             }}
        />
    )
}