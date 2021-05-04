import axios from 'axios'
const baseUrl = ''



const createUser = async (data) => {
    const response = await axios.post(`/user/register`,data)
    return response.data
}

const loginUser = async (data) => {
    const response = await axios.post(`${baseUrl}/user/login`,data)
    return response.data
}

const createPet = async (data) => {
    const response = await axios.post(`${baseUrl}/user/createpet`, data)
    return response.data
}

export default { createUser, loginUser, createPet }