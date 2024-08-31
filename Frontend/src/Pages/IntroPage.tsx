import {useAppContext} from "../MainContext/AppContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const IntroPage = () => {
    const {username, setUsername} = useAppContext();
    const [localUsername, setLocalUserName] = useState<string>(username || '');
    const navigate = useNavigate();

    const handleEnterButton = () => {
        setUsername(localUsername)
        navigate('/board')
    }


    return (
        <section className="page-layout d-flex flex-col align-items-center gap-1">
            <h1> Welcome to Storemaven</h1>
            <p> please fill your username </p>
            <div className="d-flex flex-col gap-1">

                <label htmlFor="username">Username:</label>
                <input type="text"
                       id="username"
                       required={true}
                       value={localUsername}
                       onChange={(e) => setLocalUserName(e.target.value)}/>
                <button
                    disabled={!localUsername}
                    onClick={handleEnterButton}>Enter
                </button>
            </div>

        </section>

    )
};

