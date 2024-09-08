import {useAppContext} from "../MainContext/AppContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ApiService} from "../Services/api";

export const IntroPage = () => {
    const {userObject, setUserObject} = useAppContext();
    const [localUsername, setLocalUserName] = useState<string>(userObject?.username || '');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleEnterButton = async () => {
        try {
            setError('')
            setIsLoading(true)
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
            setError(e.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <section className="page-layout d-flex flex-col align-items-center gap-1" >
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
                    disabled={!localUsername || isLoading}
                    onClick={handleEnterButton}>
                    {isLoading ? 'Loading...' : 'Enter'}
                </button>
                <div style={{maxWidth: '150px',textAlign:'center'}}>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
            </div>

        </section>

    )
};

