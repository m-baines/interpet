// Import components
import SignupForm  from "./components/Signup.js"
import LoginForm  from "./components/Login.js"
// import { CreatePet } from "./components/CreatePet"
import ActivityBar from './components/ActivityBar'
import CreatePet from './components/CreatePet'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import ViewAllPets from './components/ViewAllPets'
import PetService from './services/users'
import {setUser} from './reducers/loginReducer'
import './index.css'

// Import react stuff
import { useState, useEffect } from 'react' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {useDispatch} from 'react-redux'


function App() {
  // use states
  // use effects
  
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      const token = user.token.split(' ')
      
          PetService.setToken(token[1])
    }
  }) 
  // functions e.g. onClick, onSearch
  return (
    <Router>
      <div className="flex flex-col h-screen">
       <Header /> 
        <div className="container mx-auto mb-auto px-8">
          <Switch>

            <Route exact path="/">
              <ActivityBar/>
              
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
