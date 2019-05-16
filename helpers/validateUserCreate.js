const { check} = require('express-validator/check');
const userModel = require("../models/userModel");

const validateUserCreate =  [
        // check username
          check('userName').isLength({min: 4, max: 35})
              .exists().withMessage("The username field is mandatory")
              .trim()
              .isLength({min: 4, max: 35}).withMessage("The username should be between 4 and 35 characters")
              .escape(), //for the security (nobody put his own js script),
          // check password
          check('password')
              .exists().withMessage("The username field is mandatory")
              .trim()
              .isLength({min: 4, max: 35}).withMessage("The username should be between 4 and 35 characters")
              .escape(), //for the security (nobody put his own js script),
         check('userName')
              .custom( async value => {
                 let user = await userModel.findOne({userName: value});
                if(user){
                    throw new Error("The username is already exist!");
                  }
                })
        ]

const validateHobbyRequest = [
  check('hobbies')
      .exists().withMessage("The hobbies field is mandatory")
      .trim()
      .escape(), //for the security (nobody put his own js script),
      ]

module.exports = {validateUserCreate, validateHobbyRequest};
