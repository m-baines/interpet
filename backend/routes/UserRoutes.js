const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

// user SIGN UP
router.post('/register', userController.signup_user_post);

//user LOGIN
router.post('/login', userController.login_user_post);

// user CREATE PET
router.post('/createpet', userController.create_pet_post);

// user GET all PETS
router.get('/pets', userController.get_user_pets);

// user GET specific PET
router.get('/pets/:id', userController.get_specific_pet);

// user GET OLDEST PET
router.get('/oldestpet', userController.get_oldest_pet);

module.exports = router