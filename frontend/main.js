const socket = io("https://tic-tac-toe-mjsu.onrender.com/", { transports: ["websocket"] });
let userDetails = new URLSearchParams(window.location.search);

const name = userDetails.get("username")
const room = userDetails.get("room");



let messageInput = document.getElementById('messageInput');
let sendBtn = document.getElementById('sendBtn');


socket.emit("userDetailsX", userDetail(name, room));

socket.on("output", (msg) => {
  showIncomingMessage(`${msg.bot}`, `${msg.message}`, `${msg.time}`)
});

socket.on("joinedGame", (data) => {
  showIncomingMessage(data.bot, `${name}! ${data.message}`, data.time)
});

sendBtn.addEventListener("click", () => {
  socket.emit("message", messageFormat(name, message))
})



function showIncomingMessage(name, message, timeX) {
  let displayMessage = document.getElementById("displayMessage");
  let messageBox = document.createElement("div");
  messageBox.setAttribute('class', "messageBox");
  let identity = document.createElement("div");
  identity.setAttribute('class', "identity");
  let user_name = document.createElement("h4");
  user_name.innerText = name;
  let time = document.createElement("h4");
  time.innerText = timeX;
  identity.append(user_name, time);
  let mainMessage = document.createElement("div");
  mainMessage.setAttribute('class', "mainMessage");
  let para = document.createElement("p");
  para.innerText = message;
  mainMessage.append(para);
  messageBox.append(identity, mainMessage);
  displayMessage.append(messageBox);
}



function userDetail(name, room) {
  return {
    name, room
  }
}


function messageFormat(name, message) {
  return {
    name,
    message: messageInput.value
  }
}


let logOutBtn = document.getElementById('logOutBtn');

logOutBtn.addEventListener('click', () => {
  localStorage.setItem('token', null);
  window.location = "./index.html"
})