// Import components
import SignupForm  from "./components/Signup.js"
import LoginForm  from "./components/Login.js"
// import { CreatePet } from "./components/CreatePet"
import ActivityBar from './components/ActivityBar'
import CreatePet from './components/CreatePet'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import ViewAllPets from './components/ViewAllPets'
import Landing from './components/Landing'
import Animation from './components/Animation'

// Import services
import userService from './services/users'

// Import reducers
import {setUser} from './reducers/loginReducer'
import {setPet} from './reducers/petReducer'

import './index.css'

// Import react and redux
import { useState, useEffect } from 'react' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'


function App() {
  // use states
  const dispatch = useDispatch()

  
  // use effects
  // persist logged in user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      const token = user.token.split(' ')
      userService.setToken(token[1])

      userService.getOldestPet()
       .then( response => { 
         console.log('get oldest pet' + response )
         dispatch(setPet(response))})
       .catch( error => console.log(error))
      

    }
  }, []) 

 /* useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      userService.getOldestPet()
       .then( response => { 
         console.log('get oldest blog' + response )
         dispatch(setPet(response))})
       .catch( error => console.log(error))
      
    }

  }, [])*/ 

  return (
    <Router>
      <div className="flex flex-col h-screen">
       <Header /> 
        <div className="bodywrapper">
          <Switch>

            <Route exact path="/">
              <Landing/>
              <ActivityBar/>
              <Animation/>
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
