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

exports.pet_clean = (req, res) => {
    Pet.findOneAndUpdate(
        { _id: req.params.id, cleanliness: false },
        { "cleanliness" : true, $inc: {"happiness" : 2} },
        {new: true},
        (err, result) => {
            if (err) {
                res.send(err)
            } else if (result) {
                res.json("Your pet has been cleaned. " + result)
            } else {
                res.json("Your pet is already clean.")
            }
        }
    ) 
}

exports.pet_heal = (req, res) => {
    Pet.findOneAndUpdate(
        { _id: req.params.id, sickness: true },
        { "sickness" : false, $inc: {"happiness": 3} },
        {new: true},
        (err, result) => {
            if (err) {
                res.send(err)
            } else if (result) {
                res.json("Your pet has been healed. " + result)
            } else {
                res.json("Your pet is already healthy.")
            }
        }
    )
}

