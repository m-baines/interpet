import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/v1'


let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
} 


const createUser = async (data) => {
    const response = await axios.post(`${baseUrl}/user/register`,data)
    return response.data
}

const loginUser = async (data) => {
    const response = await axios.post(`${baseUrl}/user/login`,data)
    return response.data
}

const createPet = async (data) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(`${baseUrl}/user/createpet`, data, config)
    return response.data
}

const viewAllPets = async() => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.get(`${baseUrl}/user/pets`, config)
    return response.data

}

const viewPet = async (id) => {
    const response = await axios.get(`${baseUrl}/user/pets/${id}`)
    return response.data
}

export default { createUser, loginUser, createPet, viewPet, viewAllPets, setToken }