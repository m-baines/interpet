

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer.js';
import logo from '../interpet.png';






const Header = () => {

    const user = useSelector(state=> state.user)
    const dispatch = useDispatch()

    const logoutHandler = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))


    }

    return (
      <div className="Headerwrapper">
        <header className="App-header">
          <Link className="logo" to="/"> <img alt="logo" src={logo}/></Link>
        </header>
        
        {user=== null?
        <div>
          <div className="headerlinks">
            <Link to="/register"> Register </Link>
            <Link to="/login"> Login </Link>
          </div> 
          <div className="mobileheaderlinks">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div> :

        <div>

          <div className="headerlinks">
            <span className="greeting">Hi, {user.data}</span>
            <Link to='/viewPets'> View All Pets </Link>  
            <Link to='/createPet'> Create Pet </Link>
            <span className="logout"> <button onClick={logoutHandler}> Logout </button> </span>
          </div>
          <div className="mobileheaderlinks">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        }
      </div> 
    )
}

export default Header