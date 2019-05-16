const express = require("express");
const app = express();
const port = 5000;
const connectToDB = require("./helpers/connectToDB");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const errorHandler = require("./helpers/errors");
const imageRouter = require("./routes/imageRouter");

connectToDB();

// first step convert to json
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);
app.use(cookieParser());
app.use("/users/", userRouter);
app.use("/images", imageRouter);
app.use(express.static("browser"));
app.listen(port);
console.log(`Server is listen to port ${port}`);
