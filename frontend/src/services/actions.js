import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/v1'

const feedPet = async (id) => {
    const response = await axios.put(`${baseUrl}/actions/feed/${id}`)
    return response.data
}

const petPet = async (id) => {
    const response = await axios.put(`${baseUrl}/actions/pet/${id}`)
    return response.data
}

const cleanPet = async (id) => {
    const response = await axios.put(`${baseUrl}/actions/clean/${id}`)
    return response.data
}

const healPet = async (id) => {
    const response = await axios.put(`${baseUrl}/actions/heal/${id}`)
    return response.data
}

const releasePet = async (id) => {
    const response = await axios.delete(`${baseUrl}/actions/release/${id}`)
    return response.data
}

export default { feedPet, cleanPet, healPet, releasePet, petPet}