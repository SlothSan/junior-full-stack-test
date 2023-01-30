const express = require('express');
const Dog = require("../models/dog")
const User = require("../models/user")
const router = express.Router();

//Gets the favourite dogs for a user. 
router.get('/favorites', async (req, res, next) => {
    try {
        const username = req.query.name
        const results = await User.exists({name: username});
        if (results === null) {
            res.status(404)
            res.send({message: "user does not exist!", data: []})
        } else {
            const favourites = await User.find({name: req.query.name})
            res.status(200);
            res.send({message: "users favourites", data: [favourites[0].favourites]})
        }
    } catch {
        res.status(400)
        res.send({message: "invalid data supplied", data: []})
    }
})

//Adds a dog to a users favourites.
router.post('/favorites', async (req, res, next) => {
    try {
        const results = await User.exists({name: req.body.name})
        if (results === null) {
            const user = await new User({
                name: req.body.name,
                favourites: req.body.favourites
            })
            await user.save();
            res.status(200);
            res.send({message: "user created successfully", data: []})
        } else {
            await User.findOneAndUpdate({name: req.body.name}, {$addToSet: {favourites: req.body.favourites}})
            res.status(200);
            res.send({message: "updated users favourites", data: []})
        }
    } catch {
        res.status(400)
        res.send({message: "invalid data supplied", data: []})
    }
})

//Delete the dog from a users favorites
router.delete('/favorites', async (req, res, next) => {
    const name = req.body.name, favourite = req.body.favourites
    if (name === undefined || favourite === undefined) {
        res.status(400)
        res.send({message: "invalid data supplied", data: []})
    } else {
        try {
            await User.updateOne({name: name}, {$pullAll: {favourites: favourite}})
            res.status(200);
            res.send({message: `removed ${favourite} from ${name}'s favourites`, data: []})
        } catch {
            res.status(400)
            res.send({message: "invalid data supplied", data: []})
        }
    }
})

//Returns all dogs with ratings with there average rating and rating count
router.get('/ratings', async (req, res, next) => {
    //TODO Tidy this up and make it more DRY.
    const dogs = await Dog.find();
    for (let i = 0; i < dogs.length; i++) {
        let ratingsCount = dogs[i].rating.length;
        let sumRatings = (dogs[i].rating.reduce((prev, current) => prev + current, 0)
            / ratingsCount);
        sumRatings = Math.round(sumRatings * 1e1) / 1e1
        dogs[i].averageRating = sumRatings;
        dogs[i].ratingCount = ratingsCount;
    }
    if (req.query.sort === undefined && req.query.filter === undefined) {
        res.status(200);
        res.send({message: "successfully retrieved all dog ratings", data: [dogs]})
    } else if (req.query.filter !== undefined && req.query.filtertype !== undefined) {
        let filter = req.query.filter
        let filterType = req.query.filtertype
        let filteredArray = []
        if (filterType === "gte") {
            filteredArray = dogs.filter((dog) => {
                return dog.averageRating >= filter
            })
        } else if (filterType === "lte") {
            filteredArray = dogs.filter((dog) => {
                return dog.averageRating <= filter
            })
        }
        res.status(200);
        res.send({message: "successfully filtered dogs based on filter value", data: [filteredArray]})
    } else if (req.query.sort === "asc averageRating") {
        dogs.sort((a, b) => {
            return a.averageRating - b.averageRating;
        })
        res.status(200);
        res.send({message: "successfully sorted dog ratings ascending order", data: [dogs]})
    } else if (req.query.sort === "dsc averageRating") {
        dogs.sort((a, b) => {
            return b.averageRating - a.averageRating;
        })
        res.status(200);
        res.send({message: "successfully sorted dog ratings descending order", data: [dogs]})
    } else if (req.query.sort === "asc ratingCount") {
        dogs.sort((a, b) => {
            return a.ratingCount - b.ratingCount;
        })
        res.status(200);
        res.send({message: "successfully sorted rating count ascending order", data: [dogs]})
    } else if (req.query.sort === 'dsc ratingCount') {
        dogs.sort((a, b) => {
            return b.ratingCount - a.ratingCount;
        })
        res.status(200)
        res.send({message: "successfully sorted rating count descending order", data: [dogs]})
    } else if (req.query.sort === "asc breed") {
        dogs.sort((a, b) => {
            return a.breed.localeCompare(b.breed)
        })
        res.status(200);
        res.send({message: "successfully sorted breeds in alphabetical order", data: [dogs]})
    } else if (req.query.sort === "dsc breed") {
        dogs.sort((a, b) => {
            return b.breed.localeCompare(a.breed);
        })
        res.status(200);
        res.send({message: "successfully sorted breeds in reverse alphabetical order", data: [dogs]})
    }
})

//Returns the rating for a specific dog.
router.get('/ratings/:name', async (req, res, next) => {
    try {
        const dogRatings = await Dog.find({"breed": req.params.name});
        res.status(200)
        res.send({
            message: "ratings retrieved successfully",
            data: [dogRatings[0].rating, dogRatings[0].rating.length]
        })
    } catch {
        res.status(200);
        //If no dog in db send array with 0 ratings 0 ratings count
        res.send({message: "no ratings for that dog", data: [0, 0]})
    }
})

//Posts a rating for a dog, if the Dog doesn't yet exist create it, else update the dog's ratings
router.post('/ratings', async (req, res, next) => {
    if (req.body.breed === undefined || req.body.url === undefined || req.body.rating === undefined) {
        res.status(400)
        res.send({message: "invalid data supplied", data: []})
    } else {
        let results = await Dog.exists({breed: req.body.breed})
        if (results === null) {
            const dog = new Dog({
                'url': req.body.url,
                "breed": req.body.breed,
                "rating": req.body.rating
            })
            await dog.save();
            res.status(200)
            res.send({message: "successfully created dog and rating added", data: []});
        } else {
            await Dog.findOneAndUpdate({breed: req.body.breed}, {$push: {rating: req.body.rating}});
            res.status(200)
            res.send({message: 'success rating added', data: []});

        }
    }
});

module.exports = router;
