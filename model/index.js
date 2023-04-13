const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
     name:{
          type: String
     },
     dob:{
          type: String 
     },
     description:{
          type:String
     },
     age: {
        type:Number

     }
     
});

module.exports = mongoose.model("zptasks", userSchema)