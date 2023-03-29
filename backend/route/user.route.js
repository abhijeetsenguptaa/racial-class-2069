const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const { UserModel } = require('../model/user.model');
const { uniqueMail } = require('../middleware/uniqueMail.middleware');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorize.middleware');

require('dotenv').config();

const userRoute = express.Router();


userRoute.get('/',authentication,authorize(["Admin"]),async(req,res)=>{
    try{
        let data = await UserModel.find({role:"Player"});
        res.send(data);
    }catch(err){
        res.send(err)
    }
})


//This route is made for the registration of the user...............
userRoute.post('/register',uniqueMail,async(req,res)=>{
    try{
        const {name,email,password,role,registered_on} = req.body;
        bcrypt.hash(password,5,async(err,hash)=>{
            let newUser = new UserModel({name,email,password:hash,role,registered_on});
            let data = await newUser.save();
            res.send(data);
        })
    }catch(err){
        res.send(err);
    }
})


// This route is made for the login of the user.....................
userRoute.post('/login',async(req,res)=>{
    try{
        const {email,password}= req.body;
        let findData = await UserModel.find({email});
        if(findData.length>=1){
            bcrypt.compare(password,findData[0].password,async(err,result)=>{
                if(result){
                    const token = jwt.sign({user_email:findData[0].email},process.env.secret_key,{expiresIn:'7d'});
                    res.send({'msg':'Login Successful','token':token});
                }else{
                    res.send('Wrong Credentials')
                }
            })
        }else{
            res.send('User not found!')
        }
    }catch(err){
        res.send(err);
    }
})



// For verification of the email-id provided this route is been made.....
userRoute.post('/send',async(req,res)=>{
    try{
        const {email} = req.body;
    }catch(err){
        res.send(err);
    }
})
module.exports = {userRoute};