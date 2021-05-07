const statsReducer = (state = null, action) => {

    switch(action.type) {
      case 'SET_STATS': {
        return action.data
      }

    default:
      return state 
    }
}

export const setStats = (data) => {
    return {
        type: 'SET_STATS',
        data 
    }
}

export default statsReducer