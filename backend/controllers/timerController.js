const Pet = require('../models/pet')

exports.getAllPets = async (req, res) => {
    const results = await Pet.find({})
    console.log(results)
    return results 
}

// Happiness Timer
const updatePets = async () => {
  const allPets = getAllPets()
  
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
    if (pet.dirty) {
        pet.happiness -= 2
    }
    // Sick check
    if (pet.sick) {
        pet.happiness -= 3
    }
  })
}



