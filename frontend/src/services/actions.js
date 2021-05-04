import axios from 'axios'
const baseUrl = ''



const feedPet = async (id) => {
    const response = await axios.post(`${baseUrl}/actions/feed/:${id}`)
    return response.data

}

const petPet = async (id) => {
    const response = await axios.post(`${baseUrl}/actions/pet/:${id}`)
    return response.data

}

const cleanPet = async (id) => {
    const response = await axios.post(`${baseUrl}/actions/clean/:${id}`)
    return response.data

}

const healPet = async (id) => {
    const response = await axios.post(`${baseUrl}/actions/heal/:${id}`)
    return response.data

}

const releasePet = async (id) => {
    const response = await axios.post(`${baseUrl}/actions/release/:${id}`)
    return response.data

}

export default { feedPet, cleanPet, healPet, releasePet, petPet}