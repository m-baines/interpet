// Import components
import SignupForm  from "./components/Signup.js"
import LoginForm  from "./components/Login.js"
import ActivityBar from './components/ActivityBar'
import Modal from './components/Modal'
import CreatePet from './components/CreatePet'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import ViewAllPets from './components/ViewAllPets'
import Landing from './components/Landing'
import Animation from './components/Animation'

// Import services
import userService from './services/users'

// Import react and redux
import { useEffect } from 'react' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Import reducers
import { setUser } from './reducers/loginReducer'
import { setPet } from './reducers/petReducer'
import { setAllPets } from './reducers/allPetsReducer';

// Import styling
import './index.css'

function App() {
  // redux state
  const dispatch = useDispatch()
  const user = useSelector(state=> state.user)
  const pet = useSelector(state=> state.pet)

  // use effects
  // persist logged in user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      userService.setToken(user.token)
    }
  }, []) 

  useEffect(() => {
    if (user) {
      userService.getOldestPet()
       .then( response => { 
         dispatch(setPet(response))})
       .catch(error => console.log(error))
    }
  }, [user])

  useEffect(()=> {
    //set view all pets 
    userService.viewAllPets()
    .then(pets => dispatch(setAllPets(pets)))
    .catch(error=> console.log(error))
  }, [user, pet])

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header/>
          <div className="bodywrapper">
            <Switch>
              <Route exact path="/">
                <Landing/>
                <ActivityBar/>
                <Modal/>
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
            </Switch>
          </div>
      </div>
    </Router>
  );
} 

export default App;
