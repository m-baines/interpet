// Import components
import SignupForm  from "./components/Signup.js"
import LoginForm  from "./components/Login.js"
// import { CreatePet } from "./components/CreatePet"
import Main from './components/Main'

// Import react stuff
import { useState, useEffect } from 'react' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  // use states
  // use effects
  // functions e.g. onClick, onSearch
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* <Header handleLoginClick={handleLoginClick} handleLogoutClick={handleLogoutClick} loggedIn={loggedIn} />  */}
        <div className="container mx-auto mb-auto px-8">
          <Switch>
            <Route exact path="/">
              <SignupForm />
            </Route>
            <Route exact path="/login">
              <LoginForm />
              <Main/> 
            </Route>
            
          </Switch>
        </div>
        {/*<Footer /> */}
      </div>
    </Router>
    
  );
} 

export default App;
