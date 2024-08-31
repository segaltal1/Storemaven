import LoaderIcon from '../../assets/images/loader.svg';
import styles from './style.module.scss';
import {useEffect} from "react";
import {useAppContext} from "../../MainContext/AppContext";
import {getRandomNumber} from "../../Helpers/utils";

export const Loader = () => {
    const {setGameState} = useAppContext();

    useEffect(() => {
        //get random timeout between 2-5 seconds
        const randomTimout = getRandomNumber(2000, 5000)
        const timeoutId = setTimeout(() => {
            setGameState('Playing')
        }, randomTimout)

        return () => {
            clearTimeout(timeoutId)
        }

    }, [])

    return (
        <div className={styles.loader}>
            <img src={LoaderIcon} alt="loading"/>
        </div>
    );
};

