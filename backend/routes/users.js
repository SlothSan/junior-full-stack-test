const express = require('express');
const User = require("../models/user");
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const username = req.query.name;
        const results = await User.exists({name: username});
        if (results === null) {
            const user = await new User({
                name: username,
            })
            await user.save();
            res.status(200)
            res.send({message: "username created", data: []});
        } else {
            res.status(200);
            res.send({message: "username found!", data: []})
        }
    } catch {
        res.status(400)
        res.send({message: "invalid format for data supplied", data: []})
    }

})

module.exports = router;