const express = require('express')
const router = express.Router()

const actionsController = require('../controllers/actionsController')

// actions FEED PET
router.put('/feed/:id', actionsController.feed_pet);

module.exports = router