import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setShowModal } from '../reducers/showModalReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setPet } from '../reducers/petReducer'
import { setStats } from '../reducers/statsReducer'

import actionService from '../services/actions'



const Modal = () => {

    let showModal = useSelector(state => state.showModal)
    let activePet = useSelector(state => state.pet)

    const dispatch = useDispatch()

    const handleReleasePet = async () => {
        let release = await actionService.releasePet(activePet._id)
        dispatch(setShowModal(false))
        dispatch(setPet(null))
        dispatch(setStats(null))
        dispatch(setNotification(release))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 30*1000)
    }

    return (
        <div className={showModal ? "modal modal-display-block" : "modal modal-display-none"}>
            <section className="modal-main">
                <h2>Are you sure you want to release your pet? <b>You won't be able to get it back.</b></h2>
                <div className="modal-btn-container">
                    <button className="modal-btn" type="button" onClick={handleReleasePet}>
                        Yes
                    </button>
                    <button className="modal-btn" type="button" onClick={() => {dispatch(setShowModal(false))}}>
                        No
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Modal
