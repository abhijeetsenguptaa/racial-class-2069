const express = require('express');
const app = express();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const { connection } = require('./configs/connection');
const { userRoute } = require('./route/user.route');
require('dotenv').config();



app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Welcome to the Live X's And O's")
})

// All the routes are going to be attached here..
app.use('/users',userRoute);

// Socket-IO work starts here ----------------------------------------------
// io.on('connection',(socket)=>{
//     socket.emit('message','Welcome to the Game')
// })


app.listen(process.env.port,async(req,res)=>{
    try{
        await connection;
        console.log('Server is connected to the Database.');
    }catch(err){
        console.log('Server could not connect to the Database.');
    }
    console.log(`Server is listening to the port : ${process.env.port}.`);
})