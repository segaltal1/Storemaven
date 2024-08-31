import {useAppContext} from "../../MainContext/AppContext";

export const Header = () => {
    const {username} = useAppContext();

    return (
        <div className="header-wrapper d-flex flex-col justify-center">
            <h2>Reaction Game</h2>
            {username && <h3 className="m-0" style={{color: 'dimgrey'}}>Username: {username}</h3>}
        </div>
    );
};

