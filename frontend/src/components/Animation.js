import React, {useState, useEffect} from 'react'
import userService from '../services/users'
import { useSelector } from 'react-redux'

import loveGif from '../layout/animations/love.gif'
// import webGif from '../layout/animations/web.gif'
// import tvGif from '../layout/animations/tv.gif' 
import shockedGif from '../layout/animations/shocked.gif'
import deadGif from '../layout/animations/dead.gif'
import sadGif from '../layout/animations/sad.gif'
import cryingGif from '../layout/animations/crying.gif'
import happysadGif from '../layout/animations/happysad.gif'
import happyGif from '../layout/animations/happy.gif'


const Animation = () => {


    let activePet = useSelector(state => state.pet)
    let notification = useSelector(state => state.notify)
    const [stats, setStats] = useState(null)

    useEffect(() => {
        
        const interval = setInterval(() => {
            if (activePet) {
            userService.viewPet(activePet._id)
             .then(response => setStats(response))
             .catch(error => console.log(error)) }
        }, 1000);

    
        return () => clearInterval(interval)

    }, [activePet, notification])

    const gif = () => {
        if (stats !== null) {
            if (stats.sick.status) {
                return deadGif
            } else if (stats.dirty.status) {
                return cryingGif
            } else if (stats.happiness >= 75) {
                return loveGif
            } else if (stats.happiness >= 50) {
                return happyGif
            } else if (stats.happiness >= 25) {
                return sadGif
            } else if (stats.happiness >= 0) {
                return cryingGif
            } 
        }
    }
    return (
        activePet ? 
        <div className="animationGif">
            <img src={gif()} alt="loading..."/>
        </div> : null
    )
    
}

export default Animation
