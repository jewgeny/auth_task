const express = require("express");
const {createUser, loginUser, deleteUser, changeHobbies} = require("../helpers/methods");
const userRouter = express.Router();
const { check, validationResult } = require('express-validator/check');
const userModel = require("../models/userModel");



userRouter.post("/create", [
        // username should be between 4 and 35 characters of any type
          check('userName').isLength({min: 4, max: 35}),
            // password must be between 8 and 20 characters
          check('password').isLength({ min: 8, max: 20 })
        ],
          check('userName').custom( async value => {
              let user = await userModel.findOne({userName: value});
              if(user){
                throw new Error("The username is already exist!");
              }
            }),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }
          //after the wrong messages are exucuted or not, then => next() => for executing the method function (createUser)
         next();
       },
       createUser
);

userRouter.post("/login", loginUser);
userRouter.delete("/delete", deleteUser);
userRouter.put("/update/:hobby", changeHobbies);



module.exports = userRouter;
