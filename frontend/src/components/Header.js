

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer.js';
import { setPet } from '../reducers/petReducer.js';
import { setStats } from '../reducers/statsReducer.js';
import { setAllPets } from '../reducers/allPetsReducer';
import {useHistory} from 'react-router-dom'

import logo from '../interpet.png';






const Header = () => {

    const user = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const logoutHandler = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))
        dispatch(setPet(null))
        dispatch(setStats(null))
        dispatch(setAllPets([]))
        history.push('/')


    }

    return (
      <div className="Headerwrapper">
        <header className="App-header">
          <Link className="logo" to="/"> <img alt="logo" src={logo}/></Link>
        </header>
        
        {user=== null?
        <div>
          <div className="headerlinks">
            <Link to="/register" className="hlinks"> Register </Link>
            <Link to="/login" className="hlinks"> Login </Link>
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
            <Link to='/viewPets' className="hlinks"> View All Pets </Link>  
            <Link to='/createPet'className="hlinks"> Create Pet </Link>
            <button className="logout" onClick={logoutHandler}> Logout </button>
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