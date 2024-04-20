
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc register User
//@route post /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res) => {

    const { username , email , password } = req.body;

    if(!username || !email || !password){

        res.status(404);
        throw new Error("Please Field Mandatory Fields");
    }

    const user = await User.findOne({email});
    
    if(user) {
        res.status(404);
        throw new Error("User Already Registered");
    }


    const hashPassword = await bcrypt.hash(password,10);
    const userRecord = await User.create({
        username ,
        email ,
        password : hashPassword
    });

    if(userRecord){
        res.status(200).json({_id : userRecord.id , email : userRecord.email});
    }
    else {
        res.status(404);
        throw new Error("Invalid userDetails Filled");
    }

    res.status(200).json({message : "Register the user"});
});


//@desc login User
//@route post /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) => {

    const { email , password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("Please Enter Valid Details");
    }

    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password,user.password)){
        const accesstoken =  jwt.sign({
            user : {
                username : user.username ,
                id : user.id,
                email : user.email
            }
        },
        process.env.ACCESS_SECRET_KEY,
        {expiresIn : "20m"}

    );
        res.status(200).json({accesstoken});
    }
    else {
        res.status(400);
        throw new Error("Problem in Sign In");
    }

    

    
});



//@desc current User
//@route post /api/users/login
//@access private
const currentUser = asyncHandler(async (req,res) => {
    res.status(200).json(req.user);
} );


module.exports = {registerUser , loginUser , currentUser};