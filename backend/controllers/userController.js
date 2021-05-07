const User = require('../models/user')
const Pet = require('../models/pet')
const { body, validator, sanitizeBody, validationResult } = require("express-validator")
const { getUserId } = require('../utilities/utilities')


const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

// Sign up POST
exports.signup_user_post = [

  // Validate fields.
  body("username", "Username must not be empty.").isLength({ min: 1 }).trim(),

  body("email").isEmail(),

  // Password must be at least 8 chars long
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),

  //Sanitize fields.
  sanitizeBody("username").escape(),

  (req, res) => {
    //Extract validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors)
      res.status(500).json(errors); //"data failed validation"
    } else {

      User.find({username: req.body.username}).exec((err, found) => {
        if (err) {return next (err)}
        if (found.length !== 0) {
          res.status(409).send("This username already exists.")
        }
        else {
          bcrypt.hash(req.body.password, 10 , (err, hashedPassword) => {
            if (err) return err
            
            userDetails = {
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email,
            }

            let user = new User(userDetails)

            user.save((err, data) => {
              if (err) return next (err)
              
              const accessToken = jwt.sign({ id: data._id }, process.env.JWT_SECRET)
              
              res.status(200).json({
                message: 'Congratulations, you created an account!',
                token: accessToken,
                data: data.username
              })
            })
          })
        }
      })
    }
  }
];


// Login POST

exports.login_user_post = [

  // Validate fields.
  body("username", "Username must not be empty.").isLength({ min: 1 }).trim(),

  // Password must be at least 8 chars long
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),

  //Sanitize fields.
  sanitizeBody("username").escape(),

  (req, res) => {
    //Extract validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors); //"data failed validation"
    } else {

      User.findOne({username: req.body.username}, (err, data) => {
        if (err) return next (err)
        if (!data) {
          res.json("Incorrect username.")
        } else {
          bcrypt.compare(req.body.password, data.password, (err, authenticated) => {
            if (err) {
              res.status(500).json(err)
            }
            if (authenticated) {
              const accessToken = jwt.sign({ id: data._id }, process.env.JWT_SECRET)
              res.status(200).json({
                success: true,
                token: accessToken,
                data: data.username
              })
            } else {
              return res.json(
                 'Passwords do not match.'
              )
            }
          })
        }
      })
    }
  }
]


//  Create Pet POST

exports.create_pet_post = [

  // Validate fields.
  body("name", "Invalid name.").isLength({ min: 1, max: 20 }).trim(),

  //Sanitize fields.
  sanitizeBody("name").escape(),

  (req, res) => {
    //Extract validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).send(errors); //"data failed validation"
    } else {
      const userId = getUserId(req)

      let newPet = {
        name: req.body.name,
        timeCreated: Date.now(),
        energy: 50,
        happiness: 50,
        dirty: {status: false},
        sick: {status: false},
        dead: {status: false},
        userId
      }

      let pet = new Pet(newPet)

      pet.save((err, result) => {
        if (err) res.status(500).json(err)

        else {
          res.status(201).json(result)
        }
        
      })
    }
  }
]

// GET all pets for a user

exports.get_user_pets = (req, res) => {
  const userId = getUserId(req)

  if (userId) {
    Pet.find({userId}, (err, pets) => {
      if (err) {
        res.status(500).json(err)
      } else if (JSON.stringify(pets)=="[]") {
        res.status(204).json("User has no pets.")
      } else {
        res.status(200).json(pets)
      }
    })
  } else {
    res.status(400).json("User doesn't exist.") }
}

// GET specific pet

exports.get_specific_pet = (req, res) => {
  Pet.findById(req.params.id).exec((err, pet) => {
    if (err) {
      res.status(500).json(err)
    } else if (JSON.stringify(pet)=="[]") {
      res.status(204).json("This pet does not exist.")
    } else {
      res.status(200).json(pet)
    }
  })
}

// GET oldest alive pet
exports.get_oldest_pet = (req, res) => {
  const userId = getUserId(req)

  if (userId) {
    Pet.findOne({ userId, "dead.status": false }, (err, result) => {
      if (err) { 
        res.status(500).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  }
}
