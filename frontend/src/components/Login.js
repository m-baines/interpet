import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/users'
import {useHistory} from 'react-router-dom'
import {setUser} from '../reducers/loginReducer'
import {setNotification} from '../reducers/notificationReducer'
import userService from '../services/users'



const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const notification = useSelector(state=> state.notify)

    const loginHandler = async (event) => {
        event.preventDefault()

        const credentials = {
            username,   
            password,
        }
  
        try {
            const user = await loginService.loginUser(credentials)

            if(user.success) {
              window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
                )
            userService.setToken(user.token)    
            dispatch(setUser(user))
            setUsername('')
            setPassword('')
            history.push('/')

            }
            else {
              dispatch(setNotification(user))
              setTimeout(()=> {
                dispatch(setNotification(null))

              },5000)
            }

        }
        catch (exception) {
            console.log('login failed')
        }
  
    
       

    }

    return (
        <div>
          <div>
            <h1> Login </h1>
          </div>

          {notification}

          <div  className="formcontainer"> 
  
            <form onSubmit={loginHandler}>
  
              <div className="input">
                <input className='text-input' type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username..." />
              </div>
  
              <div className="input">
                <input className='text-input' type="password" name="password"  value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password..."/>
              </div>
  
              
              <div className="input">
                <button className="btn btn-block text-input" type="submit"> Login </button>
              </div>
            </form>
          </div>
        </div>
      )
}

export default LoginForm;