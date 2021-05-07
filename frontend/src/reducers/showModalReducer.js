const showModalReducer = (state = false, action) => {

    switch(action.type) {
      case 'SET_SHOW': {
        return action.data
      }

    default:
      return state 
    }
}

export const setShowModal = (data) => {
    return {
        type: 'SET_SHOW',
        data 
    }
}

export default showModalReducer