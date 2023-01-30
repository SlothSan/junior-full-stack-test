import "./RatingsView.css"
import {useEffect, useState} from "react";
import RatingsCard from "./RatingsCard/RatingsCard";
import './RatingsView.css'

const RatingsView = () => {
    const [dogData, setDogData] = useState([]);
    const [view, setView] = useState('?sort=asc%20averageRating')

    const getDogRatingsData = async () => {
        let url = `http://localhost:3001/dogs/ratings/${view}`
        const allDogData = await fetch(url)
        const allDogDataJson = await allDogData.json();
        await setDogData(allDogDataJson.data[0]);
    }

    useEffect(() => {
        getDogRatingsData()
    }, [view])

    return (
        <div>
            <h1>Sort and filter rated dogs</h1>
            <p>Please use the dropdown below to sort or filter the dogs that have been rated!</p>
            <form className={"ratings-filter-sort-form"}>
                <label form={"dog-ratings"}>Choose a sort:</label>
                <select onChange={(event) => setView(event.target.value)} name="dog ratings">
                    <option value="?sort=asc%20averageRating">Choose a sort!</option>
                    <option value="?sort=asc%20averageRating">Ascending ratings</option>
                    <option value="?sort=dsc%20averageRating">Descending ratings</option>
                    <option value="?sort=asc%20ratingCount">Ascending rating count</option>
                    <option value="?sort=dsc%20ratingCount">Descending rating count</option>
                    <option value="?sort=asc%20breed">Alphabetical breed names</option>
                    <option value="?sort=dsc%20breed">Reverse alphabetical breed names</option>
                </select>
                <label>Filter by average ratings greater than or equal to: </label>
                <select onChange={(event) => setView(event.target.value)}>
                    <option value="?sort=asc%20averageRating">Choose a filter!</option>
                    <option value="?filter=5&filtertype=gte">5</option>
                    <option value="?filter=4&filtertype=gte">4</option>
                    <option value="?filter=3&filtertype=gte">3</option>
                    <option value="?filter=2&filtertype=gte">2</option>
                    <option value="?filter=1&filtertype=gte">1</option>
                </select>
                <label>Filter by average ratings less than or equal to: </label>
                <select onChange={(event) => setView(event.target.value)}>
                    <option value="?sort=asc%20averageRating">Choose a filter!</option>
                    <option value="?filter=5&filtertype=lte">5</option>
                    <option value="?filter=4&filtertype=lte">4</option>
                    <option value="?filter=3&filtertype=lte">3</option>
                    <option value="?filter=2&filtertype=lte">2</option>
                    <option value="?filter=1&filtertype=lte">1</option>
                </select>
            </form>
            <div className={"rating-cards-container"}>
                {dogData !== [] ? dogData.map((dog) => {
                    return <RatingsCard breed={dog.breed} averageRating={dog.averageRating}
                                        ratingCount={dog.ratingCount} url={dog.url}/>
                }) : ""}
            </div>
        </div>
    )
}

export default RatingsView;