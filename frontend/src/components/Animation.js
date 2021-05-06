import React, {useEffect} from 'react'
import userService from '../services/users'
import { useSelector } from 'react-redux'
import { setStats} from '../reducers/statsReducer'

import loveGif from '../layout/animations/love.gif'
import deadGif from '../layout/animations/dead.gif'
import sadGif from '../layout/animations/sad.gif'
import cryingGif from '../layout/animations/crying.gif'
import happyGif from '../layout/animations/happy.gif'


const Animation = () => {


    let activePet = useSelector(state => state.pet)
    let notification = useSelector(state => state.notify)
    let stats = useSelector(state => state.stats)

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
            } else if (stats.energy <= 10) {
                return cryingGif
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
        stats ? 
        <div className="animationBox">
            <img className="animation" src={gif()} alt="loading..."/>
            <h2 className="pet-name">{stats.name}</h2>
        </div> : null
    )
    
}

export default Animation
