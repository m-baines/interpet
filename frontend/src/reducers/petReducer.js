const petReducer = (state =null,action) => {


    switch(action.type) {
      case 'SET_PET': {
    
        return action.data
      }

    default:
      return state 
    }
}



export const setPet = (data) => {
    return {
        type: 'SET_PET',
        data 
    }
}

export default petReducer