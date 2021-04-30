const User = require('../models/user')
const Pet = require('../models/pet')
const { body, validator } = require("express-validator")
const { validationResult } = require("express-validator")
const { getUserId } = require('../utilities/functions')


const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

// Sign up POST
exports.signup_user_post = [

    // Validate fields.
    body("username", "username must not be empty.").isLength({ min: 1 }).trim(),
  
    body("email").isEmail(),
  
    // password must be at least 8 chars long
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 chars long"),
  
    //Sanitize fields.
    sanitizeBody("username").escape(),
  
    (req, res) => {
      //Extract validation errors from request
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.send("data failed validation");
      }

      User.find({username: req.body.username}).exec((err, found) => {
          if (err) {return next (err)}
          if (found.length !== 0) {
              res.send("username already exists")
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
                
                res.json('user created  ' + accessToken)
              })
              })
         }
      })
}];


// Login POST

exports.login_user_post = [

    // Validate fields.
    body("username", "username must not be empty.").isLength({ min: 1 }).trim(),
  
    body("email").isEmail(),
  
    // password must be at least 8 chars long
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 chars long"),
  
    //Sanitize fields.
    sanitizeBody("username").escape(),
  
    (req, res) => {
      //Extract validation errors from request
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.send("data failed validation");
      }

      User.findOne({username: req.body.username}, (err, user ) => {
        if (err) return next (err)
        if (!user) res.json("Incorrect username")

        else {
          bcrypt.compare(req.body.password, user.password, (err, authenticated) => {
            if (err) res.json('Incorrect Password')
  
            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  
            res.json( {token: 'Bearer  ' + accessToken, success: true })
          })

        }
      })
    }
]

//  Create Pet POST

exports.create_pet_post = [

    // Validate fields.
    body("name", "name must not be empty.").isLength({ min: 1 }).trim(),

    //Sanitize fields.
    sanitizeBody("username").escape(),
  
    (req, res) => {
      //Extract validation errors from request
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.send("data failed validation");
      }

      const userId = getUserId(req)

      let newPet = {
        name: req.body.name,
        timeCreated: Date.now(),
        energy: 50,
        happiness: 50,
        cleanliness: true,
        sickness: false,
        userId

      }

      let pet = new Pet(newPet)

      pet.save((err, results) => {
        if (err) res.json("error")
        res.json("new pet created" + results)

      })

      
    }
]

exports.get_user_pets = (req,res) => {
    const userId = getUserId(req)

    if (userId) {
        Pet.find({userId}, (err, pets) => {
            if (err) res.json("user is childless")
            res.json(pets)
        })
    }

    res.json("user doesn't exist")
}

