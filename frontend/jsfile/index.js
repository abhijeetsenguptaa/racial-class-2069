let user = null;
let users = []
let turn = ''
let board = []

//Connecting from Server
var socket = io('http://localhost:5000',
    {
        transports: ['websocket'],
    }
)

socket.on('connect', function () {
    user = null;
    board = []
    document.getElementById('message').innerHTML = 'Connected'
    console.log('connected to server')
})

//If the Room is full throw this error
socket.on('full', () => {
    document.getElementById('message').innerHTML = 'Server is full, Search for another Room!'
})

// Printing user detail
socket.on('setUser', function (data) {
    user = data;
    console.log(user) // Printing user detail
})

// Getting user details from server
socket.on('start', (data) => {
    users = data.users;
    turn = data.turn;
    board = data.board;
    renderBoard();

    document.getElementById('message').innerHTML = `You are ${user.name} and your symbol is ${user.symbol}.`
})

// Initializing with unique symbol for user
socket.on('turn', (data) => {
    turn = data;
    document.getElementById('message').innerHTML = `Your Symbol is ${user.symbol}'s and It's ${turn}'s turn.`
})


// At Everymove data is updating and throwing to another user.
socket.on('move', (data) => {
    board = data.board;
    turn = data.turn;
    renderBoard();
});


// Winner 
socket.on('winner', (data) => {
    document.getElementById('message').innerHTML = `Winner is ${data}`
    setTimeout(() => {
        window.location.reload()
    }, 5000);
})

// Disconnection msg, when user is left.
socket.on('disconnect', function () {
    console.log('disconnected from server')
    document.getElementById('message').innerHTML = 'Dis-Connected'

})


// Invoking function for Tic-Tac-Toe Table
window.onload = function () {
    renderBoard();
}

// Onclick either x or o will print
function renderBoard() {
    let boardDiv = document.getElementById('board');
    let boardHTML = '';
    for (let i = 0; i < board.length; i++) {
        boardHTML += `<div onclick = "handleClick(${i})"  class="cursor-pointer w-32 h-32 text-5xl text-white grid place-content-center board-2 border  ${board[i] === 'o' ? 'bg-red-500' : board[i] == 'x' ? 'bg-green-500' : ""}"> ${board[i]}</div>`
    }
    boardDiv.innerHTML = boardHTML;
}


function handleClick(i) {
    console.log('clicked', i)  // Printing clicked button number

    if (board[i] === '') {
        if (turn === user.symbol) {
            board[i] = user.symbol;
            socket.emit('move', {
                board: board,
                turn: turn,
                i: i,
            });
        }
    }
}