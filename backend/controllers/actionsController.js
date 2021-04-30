const Pet = require('../models/pet')




exports.feed_pet = (req,res) => {

    // need to get pet's current properties then update its properties 

    Pet.findByIdandUpdate(req.params.id, {energy: } )


}