import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {setPet} from '../reducers/petReducer'


const Pet = ({x}) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const selectPet = (e) => {
    e.preventDefault()

    dispatch(setPet(x))
    history.push('/')

}

    return (
        
            <tbody>
            <tr>
                <td> {x.name} </td>
                <td> {x.timeCreated} </td>
                <td> {x.dead.status? 'R.I.P' : 'Alive'} </td>
                <td className="petbutton"> <button disabled={x.dead.status? true : false} onClick={selectPet} > Activate pet </button> </td>

            </tr>
            </tbody>

    )

}

export default Pet