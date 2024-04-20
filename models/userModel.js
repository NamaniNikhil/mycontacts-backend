const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please register the user"]
    },

    email : {
        type : String ,
        required : [true , "please register the email"],
        unique : [true , "email address is already taken "]
    },

    password : {
        type : String ,
        required : [true , "please add password "],
    } 
},
{ 
    timestamps : true 
}
);

module.exports = mongoose.model("User",userSchema);