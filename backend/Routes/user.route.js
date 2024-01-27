const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require('../Models/user.model.js')
const userRouter = express.Router();

userRouter.post("/register", async(req,res) => {
    const {name,email,avatar, password} = req.body;
    try {
       const user = await UserModel.find({email});
       if(user.length>0) {
        res.status(200).send({"msg" : "User is already present, Please Login"})
    }
    else{
        bcrypt.hash(password, 5, async (err, hash) =>{
            if(err) {
                res.status(200).send({"msg" : err})
            }else{
                const newUser = new UserModel({name,email,avatar, password:hash});
                await newUser.save();
                res.status(200).send({"msg" : "New User has been successfully added"})
            }               
        });
       }
    } catch (error) {
        res.status(400).send({"error": error})
    }
})

userRouter.post("/login", async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        console.log(user)
        if(user) {
            bcrypt.compare(password, user.password, async(err, result) => {
                // result == true
                if(err) {
                    res.status(200).send({"msg" : err})   
                }else{
                    const token = jwt.sign({userID:user._id},process.env.SECRET_KEY);
                    res.status(200).send({"msg" : "Successfully logged in", "token" : token})
                } 
            });
        }else{
            res.status(200).send({"msg" : "user not found"})
        }
    } catch (error) {
        res.status(400).send({"error": error})
    }
})


module.exports = {
    userRouter
}