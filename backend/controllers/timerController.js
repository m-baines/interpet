const Pet = require('../models/pet')

const getAllPets = async (req, res) => {
    const results = await Pet.find({})
    return results 
}


// Happiness Timer
exports.happiness = async () => {
  const allPets = await getAllPets()

  // Shows the status of the pets for testing
  console.log(allPets)

  allPets.map((pet) => {
    // Energy checks
    if (pet.energy >= 75 ) {
        pet.happiness += 2 
    } else if (pet.energy >= 50) {
        pet.happiness += 1
    } else if (pet.energy >= 0 && pet.energy <= 25) {
        pet.happiness -=1
    } else if (pet.energy == 0) {
        pet.happiness -= 3
    }
    // Dirty check
    if (pet.dirty.status) {
        pet.happiness -= 2
    }
    // Sick check
    if (pet.sick.status) {
        pet.happiness -= 3
    }

    Pet.findByIdAndUpdate(pet._id, {"happiness": pet.happiness}, {new: true}, (err, result) => {
        if (err) {console.log(err)}

    })
  })
}

// Poo Timer
exports.poo = async () => {
    const allPets = await getAllPets()

    allPets.map((pet) => {
        if (pet.dirty.status == false && pet.energy >=25 ) {
            pet.dirty.status = true
            pet.dirty.time = Date.now()
            pet.energy -= 10
            
        } else if ( pet.energy >=25 ) {
            pet.energy -= 10
        }

        Pet.findByIdAndUpdate(pet._id, {"dirty.status": pet.dirty.status, "dirty.time": pet.dirty.time, "energy": pet.energy}, {new: true}, (err, result) => {
            if (err) {console.log(err)}    
        })
    })
}

// Sick Timer
exports.sick = async () => {
    const allPets = await getAllPets()
    
    allPets.map((pet) => {
        if ( pet.sick.status == false && (Date.now() - pet.dirty.time) >= (0.5*60*1000) ) {
            pet.sick.status = true
            pet.sick.time = Date.now()
        }

        Pet.findByIdAndUpdate(pet._id, {"sick.status": pet.sick.status, "sick.time": pet.sick.time}, {new: true}, (err, result) => {
            if (err) {console.log(err)}
        })
    })
}



// Dead Timer
exports.dead = async () => {
    const allPets = await getAllPets()
    
    allPets.map((pet) => {
        if ( pet.dead.status == false && (Date.now() - pet.sick.time) >= (0.5*60*1000) ) {
            pet.dead.status = true
            pet.dead.time = Date.now()
        }

        Pet.findByIdAndUpdate(pet._id, {"dead.status": pet.dead.status, "dead.time": pet.dead.time}, {new: true}, (err, result) => {
            if (err) {console.log(err)}
        })
    })
}