import actionService from '../services/actions'
import {useSelector, useDispatch } from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'
import {setShowModal} from '../reducers/showModalReducer'
import '../ActivityBar.css'

const ActivityBar = () => {

  let activePet = useSelector(state => state.pet)
  let notification = useSelector(state => state.notify)
  const dispatch = useDispatch()

  const actionHandler = async (e) => {
      //const response = await actionService.feedPet(activePet.id)
      switch (e.target.name) {
        case 'feed':
            let feed = await actionService.feedPet(activePet._id)
            dispatch(setNotification(feed))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 10000)
            break;

        case 'pet':
            let pet = await actionService.petPet(activePet._id)
            dispatch(setNotification(pet))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 10000)
            break;

        case 'clean':
            let clean = await actionService.cleanPet(activePet._id)
            dispatch(setNotification(clean))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 10000)
            break;
                    
        case 'heal':
            let heal = await actionService.healPet(activePet._id)
            dispatch(setNotification(heal))
          setTimeout(() => {
            dispatch(setNotification(null))
          }, 10000)
            break;

        case 'release':
          dispatch(setShowModal(true))
          break;
            
        default:
            console.log('invalid action')
      }
  }

    return (
      
      
        <div className="activitycontainer">

          <div className="activity-notification">
            <h3 className="activity-notification-text">{notification}</h3>
          </div>

          {activePet ?

          <div>  
            <div className="menu">

              <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open"/>
              <label class="menu-open-button" for="menu-open">
                <span class="hamburger hamburger-1"></span>
                <span class="hamburger hamburger-2"></span>
                <span class="hamburger hamburger-3"></span>
              </label> 

              <button className="menu-item" name='release' onClick={actionHandler}> Release </button>     
              <button className="menu-item" name='clean' onClick={actionHandler}> Clean </button>
              <button className="menu-item" name='heal' onClick={actionHandler}> Heal </button>
              <button className="menu-item" name='feed' onClick={actionHandler}> Feed </button> 
              <button className="menu-item" name='pet' onClick={actionHandler}> Pet </button> 
              
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="shadowed-goo">
                      
                      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                      <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                      <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                      <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                      <feComposite in2="shadow" in="goo" result="goo" />
                      <feComposite in2="goo" in="SourceGraphic" result="mix" />
                  </filter>
                  <filter id="goo">
                      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                      <feComposite in2="goo" in="SourceGraphic" result="mix" />
                  </filter>
                </defs>
            </svg>
          </div> :
          null }
        </div> 
        
    )
}

export default ActivityBar