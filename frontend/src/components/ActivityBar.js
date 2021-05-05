import actionService from '../services/actions'
import {useSelector} from 'react-redux'




const ActivityBar = () => {

    let activePet = useSelector(state=> state.pet)


const actionHandler = async (e) =>
  {
      //const response = await actionService.feedPet(activePet.id)
      switch (e.target.name) {
        case 'feed':
            let feed = await actionService.feedPet(activePet.result._id)
            console.log(activePet.result._id)
            console.log(feed)
            break;

        case 'pet':
            let pet = await actionService.petPet(activePet.result._id)
            console.log(pet)
            break;

        case 'clean':
            let clean = await actionService.cleanPet(activePet.result._id)
            console.log(clean)
            break;
                    
        case 'heal':
            let heal = await actionService.healPet(activePet.result._id)
            console.log(heal)
            break;
            
        default:
            console.log('invalid action')    
      }
  }

    return (
        <div className="activitycontainer">


            <button name='feed' onClick={actionHandler}> Feed</button> 
            <button name='pet' onClick={actionHandler}> Pet</button> 
            <button name='clean' onClick={actionHandler}>Clean </button> 
            <button name='heal' onClick={actionHandler}> Heal </button> 
            <button name='release' onClick={actionHandler}>Release </button> 
        </div> 
    )
}

export default ActivityBar