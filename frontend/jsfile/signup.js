const registrationBtn = document.getElementById('registrationBtn');
const loginBtn = document.getElementById('loginBtn');
const url = "https://tic-tac-toe2.onrender.com/"

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

function signIn(){
    // Google's OAuth 2.0 endpoint for requesting an access token
  let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
 
  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  let form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);
 
  // Parameters to pass to OAuth 2.0 endpoint.
  const params = {'client_id': '##yourclientid##',
                'redirect_uri': '##yourredirecturi##',
                'response_type': 'token',
                'scope':'https://www.googleapis.com/auth/userinfo.profile',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};
 
  // Add form parameters as hidden input values.
  for (let p in params) {
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }
 

  document.body.appendChild(form);
  
  form.submit();
}