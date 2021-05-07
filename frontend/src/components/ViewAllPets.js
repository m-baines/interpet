import Pet from '../components/Pet';
import { useSelector } from 'react-redux';

const ViewAllPets = () => {
    const allPets = useSelector(state => state.allPets)

    return (
        <div className="petscontainer">
            <table>

                <thead>
                <tr>
                    <th> Name</th>
                    <th> Time created</th>
                    <th> Lifespan / mins</th>
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