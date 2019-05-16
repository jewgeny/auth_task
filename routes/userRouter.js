const express = require("express");
const {createUser, loginUser, deleteUser, changeHobbies, handleValidationErrors, logOut} = require("../helpers/methods");
const userRouter = express.Router();
const { check, validationResult } = require('express-validator/check');
const userModel = require("../models/userModel");
const {validateUserCreate, validateHobbyRequest} = require("../helpers/validateUserCreate");
const loginValidator = [...validateUserCreate];
loginValidator.pop();
const isAuth = require("../helpers/isAuth");


userRouter.post("/create", validateUserCreate, handleValidationErrors, createUser);
userRouter.post("/login", loginValidator, handleValidationErrors, loginUser);
userRouter.delete("/delete", deleteUser);
userRouter.put("/update", validateHobbyRequest, handleValidationErrors,  isAuth, changeHobbies);
userRouter.get("/logout", isAuth, logOut); //get => has not data (body) in this case



module.exports = userRouter;
