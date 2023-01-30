import {Rating} from "@mui/material";
import './RatingsCard.css';

const RatingsCard = (props) => {
    return (
        <div className={"rating-card"} key={props.breed}>
            <p className={"rating-card-breed"}>{props.breed}</p>
            <img className={"rating-card-hero"} src={props.url} alt={props.breed}/>
            <Rating
                className={"rating-card-rating"}
                value={props.averageRating}
                precision={0.1}
                readOnly
            />
            <p className={"rating-info"}>Average Rating: {props.averageRating}</p>
            <p className={"rating-info"}>Rating count: {props.ratingCount}</p>
        </div>
    )
}

export default RatingsCard