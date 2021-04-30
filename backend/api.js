const express = require('express')
const router = express.Router()

const userRoutes = require('./routes/UserRoutes')
const actionsRoutes = require('./routes/ActionsRoutes')

router.use('/user', userRoutes)
router.use('/actions', actionsRoutes)

module.exports = router
