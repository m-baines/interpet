const Pet = require('../models/pet')

// Feed pet

exports.feed_pet = (req, res) => {
    Pet.findOneAndUpdate(
        { _id: req.params.id, energy: { $lte: 75 } },
        { $inc: { "energy": 25, "happiness": 2 } },
        {new: true},
        (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else if (result) {
                res.status(200).json({
                    message: "Energy increased by 25. Happiness increased by 2.",
                    result
                })
            } else {
                res.status(403).json("Your pet is already stuffed!")
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
                res.status(500).send(err)
            } else if (result) {
                res.status(200).json({
                    message: "Happiness increased by 5.",
                    result
                })
            } else {
                res.status(403).json("You pet your pet, but you don't think it could get any happier!")
            }
        }
    )
}

// Pet clean

exports.pet_clean = (req, res) => {
    Pet.findOneAndUpdate(
        { _id: req.params.id, "dirty.status": true },
        { "dirty.status": false, "dirty.time": null, $inc: {"happiness" : 2} },
        {new: true},
        (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else if (result) {
                res.status(200).json({
                    message: "Your pet has been cleaned.",
                    result
                })
            } else {
                res.status(403).json("Your pet is already clean.")
            }
        }
    ) 
}

// Pet heal

exports.pet_heal = (req, res) => {
    Pet.findOneAndUpdate(
        { _id: req.params.id, "sick.status": true },
        { "sick.status": false, "sick.time": null, $inc: {"happiness": 3} },
        {new: true},
        (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else if (result) {
                res.status(200).json({
                    message: "Your pet has been healed.",
                    result
                })
            } else {
                res.status(403).json("Your pet is already healthy.")
            }
        }
    )
}

// Pet release

exports.pet_release = (req, res) => {
    Pet.findByIdAndDelete(req.params.id,
        (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else if (result) {
                res.status(200).json(result["name"] + " has been released into the wild...")
            } else {
                res.status(403).json("No pet to release.")
            }
        }
    )
}

