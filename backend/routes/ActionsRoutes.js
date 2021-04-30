const express = require('express')
const router = express.Router()

const actionsController = require('../controllers/actionsController')

// actions FEED PET
router.put('/feed/:id', actionsController.feed_pet);

// actions PET PET
router.put('/pet/:id', actionsController.pet_pet);

module.exports = router