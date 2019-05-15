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
      console.log(error);
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
       const initialToken = jwt.sign({userName: findUser.userName}, process.env.TOKEN_KEY);
       res.cookie("authToken", initialToken, {httpOnly: true});
       console.log(initialToken);
       res.status(200).json({msg: "The login was successfull!"})

   }
   catch(error){
     console.log(error);
   }
}



const deleteUser = async (req, res, next) => {
   try {

     let decodedUser = await jwt.decode(req.cookies["authToken"],  process.env.TOKEN_KEY);
     let findDeleteUser = await userModel.findOneAndDelete({userName: decodedUser.userName });

     res.clearCookie("authToken");
     findDeleteUser ?  res.status(200).json({msg: "The user was deleted"}) : res.status(200).json({msg: "The is not exist"})

   } catch (error) {
     console.log(error);
   }
}

const changeHobbies = async (req, res, next) => {
    try {

      let decodedUser = await jwt.decode(req.cookies["authToken"], process.env.TOKEN_KEY);
      let findUser = await userModel.findOne({userName: decodedUser.userName });

      if(findUser){
        let findUpdateHobby = await userModel.findOneAndUpdate({hobbies: req.params.hobby}, req.body, {new: true});
        res.status(200).json({msg: "The update was succesful"});
      }
      else{
        res.status(200).json({msg: "The update was not correct"});
      }


    } catch (error) {
      console.log(error);
    }
}

module.exports = {createUser, loginUser, deleteUser, changeHobbies, handleValidationErrors};
