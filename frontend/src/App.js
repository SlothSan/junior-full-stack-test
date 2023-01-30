import logo from "./dog-api-logo.svg";
import "./App.css";
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {Link} from 'react-router-dom'
import AllDogs from "./Components/AllDogs/AllDogs";
import Dog from "./Components/Dog/Dog";
import Favourites from "./Components/Favourites/Favourites";
import {useState, useEffect} from "react";
import Login from "./Components/Login/Login"
import RatingsView from "./Components/RatingsView/RatingsView";

function App() {
    const [allDogs, setAllDogs] = useState([]);
    const [username, setUserName] = useState('');

    useEffect(() => {
        async function fetchAllDogs() {
            const allDogs = await fetch('https://dog.ceo/api/breeds/list/all')
            const allDogsJson = await allDogs.json();
            setAllDogs(Object.entries(allDogsJson.message))
        }

        fetchAllDogs();
    }, [])

    return (
        <Container sx={{display: "flex", flexDirection: "column"}}>
            {username === '' ? <Login setUsername={setUserName}/> : <>
                <div className="App-header">
                    <div className={"header-left-container"}>
                        <h1>WoofBook</h1>
                        <img src={logo} className="App-logo" alt={"dog-book-logo"}/>
                    </div>
                    <div className={"header-right-container"}>
                        <Link className={"home-link"} to={"/ratings"}>View Ratings</Link>
                        <Link className={"home-link"} to={"/favourites"}>Favourites</Link>
                        <Link className={"home-link"} to={"/"}>Home</Link>
                        <Link onClick={() => setUserName('')} className={"home-link"} to={"/"}>Logout</Link>
                    </div>
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<AllDogs username={username} allDogs={allDogs}/>}/>
                        <Route path="/favourites" element={<Favourites username={username}/>}/>
                        <Route path="/ratings" element={<RatingsView/>}/>
                        <Route path="/dog/:breed" element={<Dog username={username}/>}/>
                        <Route path="/dog/:breed/:subbreed" element={<Dog username={username}/>}/>
                    </Routes>
                </div>
            </>}
        </Container>
    );
}

export default App;
