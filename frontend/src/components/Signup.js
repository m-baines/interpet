import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import signupService from '../services/users';
import {useHistory} from 'react-router-dom'
import {setUser} from '../reducers/loginReducer'

const SignupForm = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  

  const signupHandler = async (event) => {
      event.preventDefault()

      const credentials = {
          username,
          email,
          password
        }

      try {
          const user = await signupService.createUser(credentials)
          console.log(user)


          window.localStorage.setItem(
              'loggedUser', JSON.stringify(user)
            
          )
          dispatch(setUser(user))
            history.push('/')
          setUsername('')
          setEmail('')
          setPassword('')
          
      }
      catch (exception) {
          console.log('sign up failed')
      }

  }
     
    
  return (
      <div >
        <div >
          <h2> Register </h2>
        </div>
        <div > 

          <form onSubmit={signupHandler}>

            <div class="input">
              <input className='' type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username..."/>
            </div>
            
            <div class="input">
              <input className='' type="text" name="email"  value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email..."/>
            </div>

            <div class="input">
              <input className='' type="text" name="password"  value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password..."/>
            </div>
              
            <button className=''type="submit"> Sign Up </button>
          </form>
        </div>
    </div>
            
  ) 
    

}

export default SignupForm