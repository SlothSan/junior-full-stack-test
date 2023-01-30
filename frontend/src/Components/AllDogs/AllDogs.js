import DogCard from "../DogCard/DogCard";
import './AllDogs.css'

const AllDogs = (props) => {
    return (
        <div className={"dogs-container"}>
            <h1>Hello {props.username}! Click one of the links below to rate / favourite the dog!</h1>
            <div className={"dogs-cards-container"}>
                {props.allDogs ? props.allDogs.map((dog) => {
                    return <DogCard breed={dog[0]} subBreeds={dog[1]} key={dog[0]}/>
                }) : ""}
            </div>
        </div>
    )
}

export default AllDogs