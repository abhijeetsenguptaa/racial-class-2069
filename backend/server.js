const express = require('express');
const app = express();
const moment = require('moment')
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const { connection } = require('./configs/connection');
const { userRoute } = require('./route/user.route');
require('dotenv').config();


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

//Connecting to socket
io.on("connection", (socket) => {
    console.log('socket connected')


    //Abhijeet is working from here--------------------------------------------- 
    socket.emit('joinedGame',userJoin("Live X's And O's","Welcome to the Game"))



    function userJoin(bot,message){
        return {
            bot,
            time : moment().format('h:mm a'),
            message
        }
    }

    socket.on("userDetailsX",(data)=>{
        socket.on("message",(mesg)=>{
            io.emit("output",userJoin(`${data.name}`,mesg.message))
        })
    })

    
    //Abhijeet is working from here--------------------------------------------

    if (users.length === 2) {
        socket.emit('full');
        return;
    }

    if (users.length === 0) {
        turn = 'x';
        board = ['', '', '', '', '', '', '', '', ''];

    }

    //Adding user
    let user = {
        id: socket.id,
        name: "Player" + (users.length + 1),
        symbol: users.length === 0 ? 'x' : 'o',
        number: (users.length + 1)
    };

    if (users.length < 2) {
        users.push(user)
    }

    socket.emit('setUser', user)


    if (users.length === 2) {
        io.emit('start', {
            users: users,
            turn: turn,
            board: board,
        })
        io.sockets.emit('turn', turn);  //socket spelling check
    }


    // At every move data is updating to client
    socket.on('move', (data) => {
        board = data.board;
        turn = data.turn;
        io.emit('move', {
            board: board,
            turn: turn,
            i: data.i,
        });
        turn = turn === 'x' ? 'o' : 'x';
        io.sockets.emit('turn', turn)

        //Checking game is over or not
        let winner = '';

        for (let i = 0; i < 3; i++) {
            if (board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2] && board[i * 3] !== '') {
                winner = board[i * 3]
            }
            if (board[i] === board[i + 3] && board[i] === board[i + 6] && board[i] !== '') {
                winner = board[i]
            }
        }
        if (board[0] === board[4] && board[0] === board[8] && board[0] !== '') {
            winner = board[0];
        }
        if (board[2] === board[4] && board[2] === board[6] && board[2] !== '') {
            winner = board[2]
        }
        if (winner !== '') {
            io.emit('winner', winner)
        }

        // If the game is draw
        let draw = true;

        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                draw = false;
            }
        }
        if (draw) {
            io.emit('winner', 'Draw')
        }
    });

    // console.log(user) // For checking

    // Socket Disconnection
    socket.on('disconnect', () => {
        console.log('user Disconnected')
        users = users.filter((user) => user.id !== socket.id);
    })
})


// ********************************************************



app.get('/', (req, res) => {
    res.send("Welcome to the Live X's And O's")
})

// All the routes are going to be attached here..
app.use('/users', userRoute);

// Socket-IO work starts here ----------------------------------------------
// io.on('connection',(socket)=>{
//     socket.emit('message','Welcome to the Game')
// })


server.listen(process.env.port, async (req, res) => {
    try {
        await connection;
        console.log('Server is connected to the Database.');
    } catch (err) {
        console.log('Server could not connect to the Database.');
    }
    console.log(`Server is listening to the port : ${process.env.port}.`);
})