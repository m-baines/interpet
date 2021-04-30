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

// Pet pet

exports.pet_pet = (req, res) => {
    Pet.findOneAndUpdate(
        { _id: req.params.id, happiness: { $lte: 95 } },
        { $inc: { "happiness": 5 } },
        {new: true},
        (err, result) => {
            if (err) {
                res.send(err)
            } else if (result) {
                res.json("Happiness increased by 5. " + result)
            } else {
                res.json("You pet your pet, but you don't think it could get any happier!")
            }
        }
    )
}
