import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import PetService from '../services/users'
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
          const token = user.token.split(' ')
          console.log(token)
          PetService.setToken(token[1])
        }

        

        try {
            const pet = await PetService.createPet(credentials)
            console.log(pet) 
            dispatch(setPet(pet))
            setName('')
            history.push('/')

        }
        catch (exception) {
            console.log('pet creation failed')
        }
  
    
       

    }

    return (
        <div class="">
          <div class="">
          <h2> Name your new pet </h2>
            
          </div>
          <div className=""> 
  
            <form onSubmit={loginHandler}>
  
              <div class="input ">
                <input className='text-input' type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Name..." />
              </div>
    
              <button className="btn btn-block" type="submit"> Go </button>
            </form>
          </div>

    
      </div>
              
      ) 


}

export default CreatePet