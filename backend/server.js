const express = require('express');
const { connection } = require('./configs/connection');
const { userRoute } = require('./route/user.route');


require('dotenv').config();



const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Welcome to the Live X's And O's")
})

// All the routes are going to be attached here..
app.use('/users',userRoute);




app.listen(process.env.port,async(req,res)=>{
    try{
        await connection;
        console.log('Server is connected to the Database.');
    }catch(err){
        console.log('Server could not connect to the Database.');
    }
    console.log(`Server is listening to the port : ${process.env.port}.`);
})