const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
   try {
       const cookieFromToken = req.cookies.authToken.split(" ")[1];
       await jwt.verify(cookieFromToken, process.env.TOKEN_KEY);

       req.token = cookieFromToken; //make the cookieFromToken available for the middleware function

       next();
   } catch (eroor) {
     next(error);
   }
}

module.exports = isAuth;
