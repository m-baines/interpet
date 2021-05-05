import {useState, useEffect } from 'react'
import userService from '../services/users';





const ViewAllPets = () => {

    const [allPets,setAllPets] = useState('')

    useEffect(() => {
        const getPets = async () => {

            const pets = await userService.viewAllPets
            setAllPets(pets)
        }
        getPets()
    
    }, [])







    return (
        <div>
            {allPets[0]}
        </div>
    )

}

export default ViewAllPets