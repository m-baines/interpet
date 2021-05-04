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
  // timerController.getAllPets()

})

module.exports=app