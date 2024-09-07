import {useAppContext} from "../../MainContext/AppContext";

export const Header = () => {
    const {userObject, userScore} = useAppContext();

    return (
        <div className="header-wrapper d-flex flex-col justify-center">
            <h2>Reaction Game</h2>
            {userObject && <h3 className="m-0" style={{color: 'dimgrey'}}>Username: {userObject.username}</h3>}
            <h4 className="m-0" style={{color: 'dimgrey'}}>userScore: {userScore}</h4>
        </div>
    );
};

