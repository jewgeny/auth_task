const express = require("express");
const {createUser, loginUser, deleteUser, changeHobbies} = require("../helpers/methods");
const userRouter = express.Router();
const { check, validationResult } = require('express-validator/check');
const userModel = require("../models/userModel");
const validateUserCreate = require("../helpers/validateUserCreate");
const loginValidator = [...validateUserCreate];
loginValidator.pop();


userRouter.post("/create", validateUserCreate, createUser);
userRouter.post("/login", loginValidator, loginUser);
userRouter.delete("/delete", deleteUser);
userRouter.put("/update/:hobby", changeHobbies);



module.exports = userRouter;
