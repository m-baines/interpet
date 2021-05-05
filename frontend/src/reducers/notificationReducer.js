const notificationReducer = (state ='',action) => {


    switch(action.type) {
      case 'SET_NOTIFY': {
    
        return action.data
      }

    default:
      return state 
    }
}



export const setNotification = (data) => {
    return {
        type: 'SET_NOTIFY',
        data 
    }
}

export default notificationReducer