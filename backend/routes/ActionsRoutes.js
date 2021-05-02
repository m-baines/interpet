const express = require('express')
const router = express.Router()

const actionsController = require('../controllers/actionsController')

// actions FEED PET
router.put('/feed/:id', actionsController.feed_pet);

// actions PET PET
router.put('/pet/:id', actionsController.pet_pet);

// actions CLEAN PET
router.put('/clean/:id', actionsController.pet_clean);

// actions HEAL PET
router.put('/heal/:id', actionsController.pet_heal);

module.exports = router