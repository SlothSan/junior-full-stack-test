import {useEffect, useState} from "react";
import "./Home.css";

function Home() {
    const [dogUrl, setDogUrl] = useState("");

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setDogUrl(response.message);
            });
    }, []);

    return (
        <>
            <h1>Home page</h1>
            <div className="Home-wrapper">
                {dogUrl && <img src={dogUrl} className="Home-dog-image"/>}
                <button className="Home-button">Get a new Dog!</button>
            </div>
        </>
    );
}

export default Home;
