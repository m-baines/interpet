import actionService from '../services/actions'
import {useSelector, useDispatch } from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'




const ActivityBar = () => {

    let activePet = useSelector(state => state.pet)
    let notification = useSelector(state => state.notify)
    const dispatch = useDispatch()

const actionHandler = async (e) =>
  {
      //const response = await actionService.feedPet(activePet.id)
      switch (e.target.name) {
        case 'feed':
            let feed = await actionService.feedPet(activePet._id)
            dispatch(setNotification(feed))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
            break;

        case 'pet':
            let pet = await actionService.petPet(activePet._id)
            dispatch(setNotification(pet))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
            break;

        case 'clean':
            let clean = await actionService.cleanPet(activePet._id)
            dispatch(setNotification(clean))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
            break;
                    
        case 'heal':
            let heal = await actionService.healPet(activePet._id)
            dispatch(setNotification(heal))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 5000)
            break;
            
        default:
            console.log('invalid action')    
      }
  }

    return (
        <div className="activitycontainer">

            {notification}


            <button className="activitybutton" name='feed' onClick={actionHandler}> Feed</button> 
            <button className="activitybutton" name='pet' onClick={actionHandler}> Pet</button> 
            <button className="activitybutton" name='clean' onClick={actionHandler}>Clean </button> 
            <button className="activitybutton" name='heal' onClick={actionHandler}> Heal </button> 
            <button className="activitybutton" name='release' onClick={actionHandler}>Release </button> 
        </div> 
    )
}

export default ActivityBar