import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {upperCaseFirstLetter} from "../../HelperFunctions/HelperFunctions";
import './Dog.css'
import {Rating} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

const Dog = (props) => {
    const [dogImgUrl, setDogImgUrl] = useState('')
    const {breed, subbreed} = useParams();
    const [ratings, setRatings] = useState([]);
    const [userFavorite, setUserFavorite] = useState();
    const [userRating, setUserRating] = useState(0)
    const [fullBreedName] = useState(subbreed ? upperCaseFirstLetter(subbreed) + " " + upperCaseFirstLetter(breed)
        : upperCaseFirstLetter(breed))
    const urlBreed = `https://dog.ceo/api/breed/${breed}/images`
    const urlSubBreed = `https://dog.ceo/api/breed/${breed}/${subbreed}/images`

    const handleFavouriteClick = async () => {
        const url = 'http://localhost:3001/dogs/favorites'
        if (!userFavorite) {
            const requestOptions = {
                method: "POST",
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify({
                    'name': props.username,
                    'favourites': fullBreedName
                })
            }
            setUserFavorite(true)
            await fetch(url, requestOptions)
        } else {
            const requestOptions = {
                method: "DELETE",
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify({
                    'name': props.username,
                    'favourites': [fullBreedName]
                })

            }
            setUserFavorite(false);
            await fetch(url, requestOptions)
        }
    }

    const getUserFavourites = async () => {
        const url = 'http://localhost:3001/dogs/favorites?name=' + props.username
        const userFavs = await fetch(url)
        const userFavsJson = await userFavs.json();
        await setUserFavorite(userFavsJson.data[0].includes(fullBreedName))
    }

    const getDogImage = async (breed, subbreed) => {
        let url = ''
        subbreed !== undefined ? url = urlSubBreed : url = urlBreed
        const dogImage = await fetch(url)
        const dogImageJson = await dogImage.json();
        setDogImgUrl(dogImageJson.message[Math.floor(Math.random() * dogImageJson.message.length)])
    }

    const getDogRating = async () => {
        let url = `http://localhost:3001/dogs/ratings/${subbreed ? upperCaseFirstLetter(subbreed) + " " + upperCaseFirstLetter(breed)
            : upperCaseFirstLetter(breed)}`;
        const dogRating = await fetch(url);
        const dogRatingJson = await dogRating.json();
        setRatings(dogRatingJson.data)
    }

    const postDogRating = async () => {
        let url = `http://localhost:3001/dogs/ratings`
        const requestOptions = {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                'url': dogImgUrl,
                'breed': fullBreedName.split(' ').join(' '),
                'rating': userRating
            })
        }
        await fetch(url, requestOptions)
        getDogRating()
    }

    useEffect(() => {
        getUserFavourites()
    }, [userFavorite])

    useEffect(() => {
        getUserFavourites()
        getDogImage(breed, subbreed);
        getDogRating();
    }, [])

    return (
        <div className={"single-dog-container"}>
            <div className={"left-container"}>
                <p>Current Rating: </p>
                <Rating
                    name={"total-ratings"}
                    value={ratings[0] ? ratings[0].reduce((previous, current) => previous + current, 0) / ratings[1] : 0}
                    precision={0.5}
                    readOnly
                />
                <p>Rating count: {ratings[1]}</p>
            </div>
            <div className={"center-container"}>
                <p className={"dog-title"}>{fullBreedName}</p>
                <img className={"dog-image"} src={dogImgUrl ? dogImgUrl : ""}
                     alt={`${breed}`}/>
                <button className={"dog-button"} onClick={() => getDogImage(breed, subbreed)}>Get new image!</button>
            </div>
            <div className={"right-container"}>
                <p>Your Rating: </p>
                <Rating
                    name={"user-rating"}
                    value={userRating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setUserRating(newValue);
                    }}
                />
                <button className={"dog-button-submit"} onClick={() => postDogRating()}>Rate!</button>
                <div class={"favourite-container"}>
                    <p>Add to favourites</p>
                    <FavoriteIcon onClick={() => handleFavouriteClick()}
                                  className={userFavorite ? "heart-active" : "heart"}
                                  sx={{fontSize: 40}}/>
                </div>


            </div>
        </div>
    )
}

export default Dog;