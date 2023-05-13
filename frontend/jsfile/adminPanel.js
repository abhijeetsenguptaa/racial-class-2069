const mainContent = document.getElementById("mainContent");

fetch("http://localhost:8080/users/", {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    renderCards(data);
  })
  .catch((err) => {
    console.log(err);
  });

function renderCards(data) {
  mainContent.innerHTML = null;
  data.forEach((element) => {
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    let avatar = document.createElement("img");
    avatar.setAttribute(
      "src",
      "https://th.bing.com/th/id/OIP.ghnm15vRm0mVIoQoEm1VOAAAAA?w=196&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7"
    );
    avatar.setAttribute('class','avatar')
    let name = document.createElement("h3");
    name.innerText = "Name : " + element.name;
    let email = document.createElement("h3");
    email.innerText = "Email : " + element.email;
    let registerDate = document.createElement("h3");
    registerDate.innerText = "Registered-On : " + element.registered_on;
    let profileDelete = document.createElement("button");
    profileDelete.setAttribute('class','profileDelete')
    profileDelete.innerText = "DELETE";

    profileDelete.addEventListener("click", () => {
      fetch(`http://localhost:8080/users/remove/${element._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }).then((res) => {
        return res.json()
      })
        .then((data)=> {
        renderCards(data)
      })
    });
    box.append(avatar, name, email, registerDate, profileDelete);
    mainContent.append(box);
  });
}





// Logout button logic has been written here..................

let logOutBtn = document.getElementById('logOutBtn');


logOutBtn.addEventListener('click',()=>{
  localStorage.setItem('token',null);
  window.location.href = "./index.html"
})




