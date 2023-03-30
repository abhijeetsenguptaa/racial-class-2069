const registrationBtn = document.getElementById('registrationBtn');
const loginBtn = document.getElementById('loginBtn');
const url = "http://localhost:8080/"

registrationBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    registration()
})



loginBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    login();
})










// Registration work has been done here........................
function registration(){
    let user_name = document.getElementById('user_name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    let obj = {
        name :user_name,
        email : email,
        password : password
    }

    fetch(`${url}users/register`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
     .then((res)=>{
        return res.json()
     })
     .then((data)=>{
        alert(data.msg)
     })
     .catch((err)=>{
        console.log(err);
     })

}




//Login Function starts here..................
function login(){
    const login_email = document.getElementById('login_email').value;
    const login_password = document.getElementById('login_password').value;

    let obj = {
        email : login_email,
        password : login_password
    }


    fetch(`${url}users/login`,{
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(obj)
    })
     .then((res)=>{
        return res.json();
     })
     .then((data)=>{
        if(data.msg == "Login Successful"){
            localStorage.setItem('token',JSON.stringify(data.token));
            if(data.role == "Player"){
                window.location.href = "../home.html"
            }else{
                window.location.href = "../adminPanel.html"
            }
        }else{
            alert(data.msg);
        }
     })
     .catch((err)=>{
        console.log(err);
     })
}