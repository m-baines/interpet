import React from 'react'
import { useSelector } from 'react-redux'

// Import animations
import huggingGif from '../layout/animations/hug.gif'

const Landing = () => {
    
    let loggedIn = useSelector(state => state.user)
    let activePet = useSelector(state => state.pet)
    return (
        activePet ? null :
            <div>
                <h1>Welcome to interpet</h1>
                {loggedIn ? <><h3>Create a pet to start playing...</h3><h3>If you already have a pet, view them all using the tab above</h3></> : <h2>Please register or login to get started</h2>}
                <div className="landingAnimation">
                    <img src={huggingGif} alt="loading..."/>
                </div>
            </div>
    )
}

export default Landing
