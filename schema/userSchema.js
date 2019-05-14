const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
     userName: {type: String, required: true},
     password: {type: String, required: true},
     hobbies: {type: [String], required: true}
    }, {versionKey: false}
)

module.exports = userSchema;
