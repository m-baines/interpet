import React from 'react'
import { useSelector } from 'react-redux'

// Import animations
import huggingGif from '../layout/animations/hug.gif'
import Animation from './Animation'

const Landing = () => {
    
    let loggedIn = useSelector(state => state.user)
    let activePet = useSelector(state => state.pet)
    return (
        activePet ? null :
            <div>
                <h1>Welcome to interpet</h1>
                {loggedIn ? <h2>Start playing with your pet</h2> : <h2>Please register or login to get started</h2>}
                <Animation gif={huggingGif}/>
            </div>
    )
}

export default Landing
