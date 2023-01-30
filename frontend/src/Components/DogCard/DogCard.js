import {Link} from "react-router-dom";
import {upperCaseFirstLetter} from "../../HelperFunctions/HelperFunctions";
import './DogCard.css'
import {useEffect, useState} from "react";
import dog from "../Dog/Dog";

const DogCard = (props) => {
    const [url] = useState(`https://dog.ceo/api/breed/${props.breed}/images`)
    const [dogImg, setDogImg] = useState([])

    const getDogImage = async () => {
        const dogImage = await fetch(url)
        const dogImageJson = await dogImage.json();
        setDogImg(dogImageJson.message[Math.floor(Math.random() * dogImageJson.message.length)])
    }

    useEffect(() => {
        getDogImage();
    }, [])


    return (
        <div className={"dog-container"}>
            <div className={"breed-container"}>
                <div className={"breed-top-container"}>
                    <h2>{upperCaseFirstLetter(props.breed)}</h2>
                    <img className={"dog-hero-image"} src={dogImg} alt={props.breed}/>
                    <Link to={{
                        pathname: "/dog/" + props.breed,
                    }} key={props.breed}>{upperCaseFirstLetter(props.breed)}</Link>
                </div>
            </div>
            {props.subBreeds.length > 0 ?
                <div className={"dog-sub-breed-container"}>
                    {props.subBreeds.map((subBreed) => {
                        return <Link to={{
                            pathname: "/dog/" + props.breed + "/" + subBreed,
                        }}
                                     key={subBreed}>{upperCaseFirstLetter(subBreed) + " " + upperCaseFirstLetter(props.breed)}</Link>
                    })}
                </div>
                : ""}
        </div>
    )
}

export default DogCard;