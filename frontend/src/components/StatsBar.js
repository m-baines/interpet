import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { useSelector } from 'react-redux'

const StatsBar = () => {

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

    function getPetAge(petBirth) {
        
        // calculate age of pet
        const eTime = Date.now() - Number(petBirth) // times in milliseconds at this point
        const timeInMins = (eTime / 60000) // time in minutes
        let minutes = Math.floor(timeInMins)
        let seconds = Math.round((timeInMins - minutes) * 60)
        if (seconds === 60) {
            return [(minutes += 1), (seconds - 60)]
        }
        return [minutes, seconds] 
    }
    // setMins(getPageAge())

    let mins
    let secs

    if (stats !== null) {
        mins = getPetAge(new Date(stats.timeCreated).getTime())[0]
        secs = getPetAge(new Date(stats.timeCreated).getTime())[1]
    }

    return (


        <div className="statscontainer">
            {stats !== null? 
            <div className="innerstatscontainer">
              <div className="statsheader">
                <h3> Stats </h3> 
              </div>
              <div className="statsbar"> 
              <li> Energy: {stats.energy} </li>
              <li> Happiness: {stats.happiness} </li>
              <li> Dirty: {stats.dirty.status ?  'yes'  :  'no'} </li>
              <li> Sick: {stats.sick.status ? 'yes'  :  'no'} </li>
              <li> Age: {mins} mins {secs} secs </li> 
              </div>
            </div> :
            null }
        </div>
    )
}

export default StatsBar