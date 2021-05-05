import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { useSelector } from 'react-redux'

const StatsBar = () => {

    let activePet = useSelector(state => state.pet)

    const [stats, setStats] = useState([])
    console.log(stats)

    useEffect(() => {
        const getStats = async () => {

            const statsfromDb = await userService.viewPet(activePet.result._id)
            setStats(statsfromDb)
        }
        getStats()
    
    }, [])

    function getPetAge(petBirth) {
        // calculate age of pet
        const eTime = Date.now() - petBirth // times in milliseconds at this point
        const timeInMins = (eTime / 60000) // time in minutes
        const minutes = Math.floor(timeInMins)
        const seconds = Math.round((timeInMins - minutes) * 60)
        return [minutes, seconds]
    }


    return (
        <div>
            <li> Energy: {stats.energy} </li>
            <li> Happiness: {stats.happiness} </li>
            <li> Dirty: {stats.dirty ? <p> yes </p> : <p> no </p>} </li>
            <li> Sick: {stats.sick ? <p> yes </p> : <p> no </p>} </li>
            <li> Age: {getPetAge(stats.timeCreated)[0]} mins {getPetAge(stats.timeCreated)[1]} secs </li>
        </div>
    )
}

export default StatsBar