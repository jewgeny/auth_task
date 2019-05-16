const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const cookieparser = require('cookie-parser');
const dotenv = require("dotenv").config();
const validateUserCreate = require("../helpers/validateUserCreate");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}


const createUser = async (req, res, next) => {
    try {
      await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            throw err;
          }
          userModel.create({userName: req.body.userName, password: hash, hobbies: req.body.hobbies});
          res.status(200).json({msg: "The user was succesfull created" });
      })
    } catch (error) {
      next(error);
    }
}


const loginUser = async (req, res, next) => {
   try{

     let findUser = await userModel.findOne({userName: req.body.userName}, {_id: 0});
     console.log(findUser);

       if(!findUser){
          return res.status(404).json({msg: "The username is not correct"})
       }

      let comparePassword =  await bcrypt.compare(req.body.password, findUser.password);

      if(!comparePassword){
          return res.status(400).json({msg: "The password is not correct"})
      }

       //let inputToken = req.cookies.authToken;
       const initialToken = jwt.sign({userName: findUser.userName}, process.env.TOKEN_KEY);//payload
       const token = "Bearer" + initialToken; //Bearer => for recognized the token wich come from a cpecific website for example facebook, xing
       res.cookie("authToken", token, {httpOnly: true}); //{httpOnly: true} => can not manipulated
       console.log(initialToken);
       res.status(200).json({msg: "The login was successfull!"})

   }
   catch(error){
     next(error);
   }
}



const deleteUser = async (req, res, next) => {
   try {

     let decodedUser = await jwt.decode(req.token,  process.env.TOKEN_KEY);
     let findDeleteUser = await userModel.findOneAndDelete({userName: decodedUser.userName });

     res.clearCookie("authToken");
     findDeleteUser ?  res.status(200).json({msg: "The user was deleted"}) : res.status(200).json({msg: "The is not exist"})

   } catch (error) {
     next(error);
   }
}

const changeHobbies = async (req, res, next) => {
    try {

      let decodedUser = await jwt.decode(req.token, process.env.TOKEN_KEY);
      await userModel.findOneAndUpdate({userName: decodedUser.userName}, {$push: {hobbies: req.body.hobbies}});

      res.status(200).json({msg: "The update was succesful"});

    } catch (error) {
    next(error);
    }
}

const logOut = async (req, res, next) => {
  try {

    res.clearCookie("authToken");
    res.status(200).json({msg: "You are succesfull logout"});

  } catch (error) {
    next(error);
  }
}

module.exports = {createUser, loginUser, deleteUser, changeHobbies, handleValidationErrors, logOut};
