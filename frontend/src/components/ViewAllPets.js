import {useState, useEffect } from 'react'
import userService from '../services/users';





const ViewAllPets = () => {

    const [allPets,setAllPets] = useState('')
    console.log(allPets)

    useEffect(() => {
        const getPets = async () => {

            const pets = await userService.viewAllPets()
            
            setAllPets(pets)
        }
        getPets()
    
    }, [])







    return (
        <div>
            {allPets.length> 0? allPets[0].name : null}
            
        </div>
    )

}

export default ViewAllPets