const allPetsReducer = (state = [], action) => {

    switch(action.type) {
      case 'SET_ALL_PETS': {
        return action.data
      }

    default:
      return state 
    }
}

export const setAllPets = (data) => {
    return {
        type: 'SET_ALL_PETS',
        data 
    }
}

export default allPetsReducer