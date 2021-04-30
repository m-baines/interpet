const Pet = require('../models/pet')

// Feed pet

exports.feed_pet = (req, res) => {
        Pet.findOneAndUpdate(
            { _id: req.params.id, energy: { $lte: 75 } },
            { $inc: { "energy": 25, "happiness": 2 } },
            {new: true},
            (err, result) => {
                if (err) {
                    res.send(err)
                } else if (result) {
                    res.json("Energy increased by 25. Happiness increased by 2. " + result)
                } else {
                    res.json("Your pet is already stuffed!")
                }
            }
        )
    }

