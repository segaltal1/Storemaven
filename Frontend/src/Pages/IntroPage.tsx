import {useAppContext} from "../MainContext/AppContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ApiService} from "../Services/api";

export const IntroPage = () => {
    const {userObject, setUserObject} = useAppContext();
    const [localUsername, setLocalUserName] = useState<string>(userObject?.username || '');
    const navigate = useNavigate();

    const handleEnterButton = async () => {
        try {
            const res = await ApiService.saveUsername(localUsername)
            if (res && res.createdUser) {
                setUserObject({
                    username: res.createdUser.username,
                    userId: res.createdUser._id
                })

                navigate('/board')
            }
        } catch (e) {
            console.error(e)
        }
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

