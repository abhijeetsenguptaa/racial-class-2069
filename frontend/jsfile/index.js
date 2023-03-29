let user = null;
let users = []
let turn = ''
let board = []
var socket = io('http://localhost:5000', 
    {
        transports: ['websocket'],
    }
)

socket.on('connect', function(){
    user = null;
    board = []
    document.getElementById('message').innerHTML = 'Connected'
    console.log('connected to server')
})

socket.on('full', () =>{
    document.getElementById('message').innerHTML = 'Server is full'
})

socket.on('setUser', function(data){
    user = data;
    console.log(user)
})

socket.on('start', (data) =>{
    users = data.users;
    turn = data.turn;
    board = data.board;
    renderBoard();

    document.getElementById('message').innerHTML = `You are ${user.name} and your symbol is ${user.symbol}`
})

socket.on('move', (data) =>{
    board = data.board;
    turn = data.turn;
    renderBoard();
})

socket.on('disconnect', function(){
    console.log('disconnected from server')
    document.getElementById('message').innerHTML = 'Dis-Connected'

})

window.onload = function () {
    renderBoard();
}

function renderBoard(){
    let boardDiv = document.getElementById('board');
    let boardHTML = '';
    for (let i = 0; i < board.length; i++) {
            boardHTML += `<div onclick = "handleClick(${i})"  class="cursor-pointer w-32 h-32 text-5xl text-white grid place-content-center board-2  ${board[i]==='o'? 'bg-red-500': board[i]=='x'? 'bg-green-500': ""}"> ${board[i]}</div>`
    }
    boardDiv.innerHTML = boardHTML;
}

function handleClick(i){
    console.log('clicked',i)
    if(board[i] === ''){
        board[i]=user.symbol;
        socket.emit('move', {
            board: board,
            turn: turn,
            i:i,
        });
        renderBoard()
    }
}