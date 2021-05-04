import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import PetService from '../services/users'
import {useHistory} from 'react-router-dom'
import {setPet} from '../reducers/petReducer'



const CreatePet = () => {

    const [username, setUsername] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const loginHandler = async (event) => {
        event.preventDefault()

        
  
        try {
            const pet = await PetService.createPet(username)
            console.log(pet) 
            dispatch(setPet(pet))
            setUsername('')
            history.push('/')

        }
        catch (exception) {
            console.log('pet creation failed')
        }
  
    
       

    }

    return (
        <div class="">
          <div class="">
            
          </div>
          <div className=""> 
  
            <form onSubmit={loginHandler}>
  
              <div class="input ">
                <input className="" type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username..." />
              </div>
    
              <button className="btn btn-block" type="submit"> Create </button>
            </form>
          </div>

    
      </div>
              
      ) 


}

export default CreatePet