import {useState, useEffect } from 'react'
import userService from '../services/users';
import Pet from '../components/Pet';
import { setAllPets } from '../reducers/allPetsReducer';
import { useDispatch, useSelector } from 'react-redux';





const ViewAllPets = () => {


    const allPets = useSelector(state=> state.allPets)


    return (
        <div className="petscontainer">
            <table>
                <thead>
                <tr>
                    <th> Name</th>
                    <th> Time created</th>
                    <th> Lifespan</th>
                    <th> Dead</th>
                    <th> Activate</th>
                </tr>
                </thead>

                {allPets.length> 0? allPets.map((pet) => <Pet key={pet._id} x={pet}/>): null}



            </table>
            
            
        </div>
    )

}

export default ViewAllPets