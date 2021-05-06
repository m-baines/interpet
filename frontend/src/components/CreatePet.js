import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import userService from '../services/users'
import {useHistory} from 'react-router-dom'
import {setPet} from '../reducers/petReducer'



const CreatePet = () => {

    const [name, setName] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const loginHandler = async (event) => {
        event.preventDefault()

        const credentials = {
          name
        }

        const loggedUserToken = window.localStorage.getItem('loggedUser')
        if(loggedUserToken) {
          const user = JSON.parse(loggedUserToken)
          
          userService.setToken(user.token)
        }

        

        try {
            const pet = await userService.createPet(credentials)
            dispatch(setPet(pet))
            setName('')
            history.push('/')

        }
        catch (exception) {
            console.log('pet creation failed')
        }
  
    
       

    }

    return (
        <div>
          <div>
          <h2> Name your new pet </h2>
            
          </div>
          <div className="formcontainer"> 
  
            <form onSubmit={loginHandler}>
  
              <div class="input ">
                <input className='text-input' type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Name..." />
              </div>
              <div class="input ">
              <button className="btn btn-block text-input" type="submit"> Go </button>
              </div>
            </form>
          </div>

    
      </div>
              
      ) 


}

export default CreatePet