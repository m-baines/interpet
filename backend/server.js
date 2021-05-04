const mongoose = require('mongoose')
const timerController = require('./controllers/timerController')


require('dotenv').config({ path: '.env' })

mongoose.connect(process.env.URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })

mongoose.Promise = global.Promise // tell mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`database connection error: ${err.message}`)
})

// REQUIRE MODELS
require('./models/pet')
require('./models/user')


const app = require('./app')

const server = app.listen(8000, () => {
  console.log(`Express running on PORT ${server.address().port}`)
  setInterval(() => timerController.happinessAndEnergy(), (60*1000)) // per min
  setInterval(() => timerController.poo(), (5*60*1000 + 5))
  setInterval(() => timerController.sick(), (10*1000))
  setInterval(() => timerController.dead(), (10*1000))

})

module.exports=app