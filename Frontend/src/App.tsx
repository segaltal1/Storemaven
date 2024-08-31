import {Routes, Route} from 'react-router-dom';
import {GamePage} from "./Pages/GamePage";
import {IntroPage} from "./Pages/IntroPage";
import './App.css';

function App() {

    return (
        <Routes>
            <Route path="/" element={<IntroPage/>}/>
            <Route path="/board" element={<GamePage/>}/>
        </Routes>
    )
}

export default App;