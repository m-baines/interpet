const Pet = require('../models/pet')

const getAllPets = async (req, res) => {
    const results = await Pet.find({})
    return results 
}


// Happiness and Energy Timer
exports.happinessAndEnergy = async () => {
  const allPets = await getAllPets()

  allPets.map((pet) => {
    // Energy drain increment
    pet.energy -= 1

    // Energy checks
    if (pet.energy >= 75 ) {
        pet.happiness += 2 
    } else if (pet.energy >= 50) {
        pet.happiness += 1
    } else if (pet.energy >=25) {
        pet.happiness -= 1
    } else if (pet.energy > 0) {
        pet.happiness -= 3
    } else if (pet.energy <= 0) {
        pet.happiness -= 5
    }
    // Dirty check
    if (pet.dirty.status) {
        pet.happiness -= 2
    }
    // Sick check
    if (pet.sick.status) {
        pet.happiness -= 3
    }
    // Energy min
    if (pet.energy <= 0) {
        pet.energy = 0
    }
    // Happiness min
    if (pet.happiness <= 0) {
        pet.happiness = 0
    }

    Pet.findByIdAndUpdate(pet._id, {"happiness": pet.happiness, "energy": pet.energy }, {new: true}, (err, result) => {
        if (err) {console.log(err)}
    })
  })
}

// Poo Timer
exports.poo = async () => {
    const allPets = await getAllPets()

    allPets.map((pet) => {
        if (pet.dirty.status == false && pet.energy >= 25) {
            pet.dirty.status = true
            pet.dirty.time = Date.now()
            pet.energy -= 10
            
        } else if (pet.energy >=25) {
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
        if (pet.sick.status == false && ((pet.dirty.time !== null && (Date.now() - pet.dirty.time) >= (5*60*1000)) || pet.energy <= 0)) {
            pet.sick.status = true
            pet.sick.time = Date.now()

            Pet.findByIdAndUpdate(pet._id, {"sick.status": pet.sick.status, "sick.time": pet.sick.time}, {new: true}, (err, result) => {
                if (err) {console.log(err)}
            })
        }      
    })
}

// Dead Timer
exports.dead = async () => {
    const allPets = await getAllPets()
    
    allPets.map((pet) => {
        if (pet.dead.status == false && pet.sick.time !== null && ((Date.now() - pet.sick.time) >= (5*60*1000))) {
            pet.dead.status = true
            pet.dead.time = Date.now()

            Pet.findByIdAndUpdate(pet._id, {"dead.status": pet.dead.status, "dead.time": pet.dead.time}, {new: true}, (err, result) => {
                if (err) {console.log(err)} 
            })
        }
    })
}