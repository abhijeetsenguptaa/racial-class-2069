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
            res.send({'msg':'Email-id registered Successfully'});
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
                    res.send({'msg':'Login Successful','token':token,'role':findData[0].role,"name":findData[0].name});
                }else{
                    res.send({'msg':'Wrong Credentials'})
                }
            })
        }else{
            res.send({'msg':'User not found!'})
        }
    }catch(err){
        res.send(err);
    }
})



// For verification of the email-id provided this route is been made.....
userRoute.post('/generate', async (req, res) => {
    try {
        const { email } = req.body;
        sgMail.setApiKey(process.env.api_key);

        function generateOTP() {
            const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

            let generatedOtp = "";

            for (let i = 0; i < 4; i++) {
                const index = Math.floor(Math.random() * digits.length);

                generatedOtp += digits[index];
            }
            return generatedOtp;
        }

        const otp = generateOTP();
        

        const msg = {
            to: email,
            from: "abhi.bunnny@gmail.com",
            subject: 'One Time Password',
            text: `Otp is ${otp}`,
        }

        sgMail
            .send(msg)
            .then(() => { }, error => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            });

        res.send(otp);
    }catch(err){
        res.send(err);
    }
})

//This is route made for updating any existing user.
userRoute.patch('/update/:id',authentication,authorize(["Admin"]),async(req,res)=>{
    try{
        let id = req.params.id;
        let data = req.body;
        let newData = await UserModel.findByIdAndUpdate({_id:id},data);
        res.send(newData);
    }catch(err){
        res.send(err)
    }
})


// This is the route made to delete any existing user.
userRoute.delete('/remove/:id',authentication,authorize(["Admin"]),async(req,res)=>{
    try{
        let id = req.params.id;
        await UserModel.findByIdAndDelete({_id:id});
        res.send(await UserModel.find({role:"Player"}));
    }catch(err){
        res.send(err)
    }
})

module.exports = {userRoute};