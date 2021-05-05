

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
          <div className="headerlinks">
            <Link to="/register"> Register </Link>
            <Link to="/login"> Login </Link>
          </div> :

          <div className="headerlinks">
            <Link to='/viewPets'> View All Pets </Link>  
            <Link to='/createPet'> Create Pet </Link>
            Hi, {user.username} <button onClick={logoutHandler}> Logout </button> </div>
        }
      </div> 
    )
}

export default Header