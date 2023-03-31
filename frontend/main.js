const socket = io("http://localhost:8080", { transports: ["websocket"] });
let messageInput = document.getElementById('messageInput');
let sendBtn = document.getElementById('sendBtn');



socket.on("output", (msg) => {
  showIncomingMessage(msg.bot,msg.message);
});

socket.on("joinedGame", (data) => {
  showIncomingMessage(data.bot,data.message)
  console.log(data)
});

sendBtn.addEventListener("click",()=>{
    socket.emit("message",messageInput.value)
})



function showIncomingMessage(name, message) {
  let displayMessage = document.getElementById("displayMessage");
  let messageBox = document.createElement("div");
  messageBox.setAttribute('class',"messageBox");
  let identity = document.createElement("div");
  identity.setAttribute('class',"identity");
  let user_name = document.createElement("h4");
  user_name.innerText = name;
  let time = document.createElement("h4");
  time.innerText = "Time";
  identity.append(user_name,time);
  let mainMessage = document.createElement("div");
  mainMessage.setAttribute('class',"mainMessage");
  let para = document.createElement("p");
  para.innerText = message;
  mainMessage.append(para);
  messageBox.append(identity,mainMessage);
  displayMessage.append(messageBox);
}




