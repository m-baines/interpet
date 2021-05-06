import {useState, useEffect } from 'react'
import userService from '../services/users';
import Pet from '../components/Pet';





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
        <div className="petscontainer">
            <table>
                <thead>
                <tr>
                    <th> Name</th>
                    <th> Time created</th>
                    <th> Dead</th>
                    <th> Activate</th>
                </tr>
                </thead>

                {allPets.length> 0? allPets.map((pet) => <Pet x={pet}/>): null}



            </table>
            
            
        </div>
    )

}

export default ViewAllPets