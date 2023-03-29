const jwt = require('jsonwebtoken');
require('dotenv').config();
const {UserModel} = require('../model/user.model')

const authentication = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.secret_key,async(err,decode)=>{
            if(decode){
                email = decode.user_email;
                let data = await UserModel.find({email});
                role = data[0].role;
                next();
            }else{
                res.send('Login Required!')
            }
        })
    }else{
        res.send('User need to login first!')
    }
}

module.exports = {authentication};