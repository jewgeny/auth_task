const express = require("express");
const {createUser, loginUser, deleteUser, changeHobbies, handleValidationErrors} = require("../helpers/methods");
const userRouter = express.Router();
const { check, validationResult } = require('express-validator/check');
const userModel = require("../models/userModel");
const validateUserCreate = require("../helpers/validateUserCreate");
const loginValidator = [...validateUserCreate];
loginValidator.pop();


userRouter.post("/create", validateUserCreate, handleValidationErrors, createUser);
userRouter.post("/login", loginValidator, handleValidationErrors, loginUser);
userRouter.delete("/delete", deleteUser);
userRouter.put("/update/:hobby", changeHobbies);



module.exports = userRouter;
