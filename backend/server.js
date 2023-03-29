const express = require('express');
const { connection } = require('./configs/connection');
const { userRoute } = require('./route/user.route');
require('dotenv').config();


const app = express();
app.use(express.json());

//************************************************/
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server);
app.use(cors())



let users = []
let turn = 'x';
let board = ['', '', '', '', '', '', '', '', ''];


io.on("connection", (socket) => {
    console.log('socket connected')

    if(users.length===2){
        socket.emit('full');
        return;
    }

    if(users.length===0){
        turn = 'x';
        board = ['', '', '', '', '', '', '', '', ''];
    }


    let user = {
        id: socket.id,
        name: "Player" + (users.length + 1),
        symbol: users.length === 0 ? 'x' : 'o',
        number: (users.length + 1)
    };

    if(users.length < 2){
        users.push(user)
    }

    socket.emit('setUser', user)

    socket.emit('start', {
        users: users,
        turn: turn,
        board: board,
    })

    socket.on('move', (data) =>{
        board = data.board;
        turn = data.turn;
        io.emit('move', {
            board:board,
            turn: turn,
            i : data.i,
        });
    });

    console.log(user)

    socket.on('disconnect', () => {
        console.log('user Disconnected')
        users = users.filter((user) => user.id !== socket.id);
    })
})

// ********************************************************



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