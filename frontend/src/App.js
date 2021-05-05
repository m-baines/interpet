// Import components
import SignupForm  from "./components/Signup.js"
import LoginForm  from "./components/Login.js"
// import { CreatePet } from "./components/CreatePet"
import ActivityBar from './components/ActivityBar'
import CreatePet from './components/CreatePet'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import ViewAllPets from './components/ViewAllPets'
import userService from './services/users'
import {setUser} from './reducers/loginReducer'
import {setPet} from './reducers/petReducer'

import './index.css'

// Import react stuff
import { useState, useEffect } from 'react' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {useDispatch} from 'react-redux'


function App() {
  // use states
  // use effects
  
  const dispatch = useDispatch()

  // persist logged in user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      const token = user.token.split(' ')
      
          userService.setToken(token[1])
    }
  }, []) 

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      userService.getOldestPet()
       .then( response => { 
         console.log('get oldest blog' + response )
         dispatch(setPet(response))})
       .catch( error => console.log(error))
      
    }

  }, [])



  // functions e.g. onClick, onSearch
  return (
    <Router>
      <div className="flex flex-col h-screen">
       <Header /> 
        <div className="bodywrapper">
          <Switch>

            <Route exact path="/">
              <ActivityBar/>
              <StatsBar/>
            </Route>

            <Route exact path="/login">
              <LoginForm />
            </Route>

            <Route exact path="/register">
              <SignupForm />
            </Route>

            <Route exact path="/createPet">
              <CreatePet />
            </Route>

            <Route exact path='/viewPets'>
              <ViewAllPets/>
            </Route>  

            {/*<Footer /> */}
          

            
          </Switch>
        </div>
      </div>
    </Router>
    
  );
} 

export default App;
