const express = require("express");
const app = express();
const port = 5000;
const connectToDB = require("./helpers/connectToDB");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");

connectToDB();

// first step convert to json
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use("/users/", userRouter);
app.listen(port);
console.log(`Server is listen to port ${port}`);
