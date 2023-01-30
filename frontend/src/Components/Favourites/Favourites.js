import {useEffect, useState} from "react";
import './favourite.css'

const Favourites = (props) => {

    const [userFavourites, setUserFavourites] = useState([])

    const getUserFavourites = async () => {
        const url = 'http://localhost:3001/dogs/favorites?name=' + props.username
        const favourites = await fetch(url);
        const favouritesJson = await favourites.json();
        setUserFavourites(favouritesJson.data[0].sort());
    }

    useEffect(() => {
        getUserFavourites()
    }, [])

    return (
        <div>
            <h1>Favourites</h1>
            <p>Hello {props.username}! please see your favorites below:</p>
            <div className={"favourites-container"}>
                {userFavourites.length < 1 ?
                    <p>You have no favorites yet, go add some!</p> : userFavourites.map((fav) =>
                        <p className={"favourite"} key={fav}>{fav}</p>)}
            </div>
        </div>

    )
}

export default Favourites;