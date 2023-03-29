
let gestName=localStorage.getItem('guest')||null
let guest=document.querySelector('#guest')

let signupDatafromLs=JSON.parse(localStorage.getItem("signup-data"))||[]
let form=document.querySelector("#form")
let user_alert=document.querySelector('#massage')
form.addEventListener("submit",getUserData)

function getUserData(event){
  event.preventDefault()

  let userData={
            userName:form.user_name.value,
            email:form.email.value,
            password:form.password.value
            }  
       if(checkFrom(userData)==true)
       {
        if(chekSpicalsymbol(userData.password)==true)
        {
           
            if(checkEmail(userData.email)==true)
            {
              signupDatafromLs.push(userData)
        
               
              localStorage.setItem("signup-data",JSON.stringify(signupDatafromLs))

               alert("Signup Successful")
             
               document.querySelector('.overlay').classList.add('showoverlay')
               document.querySelector('.loginform').classList.add('showloginform')
              //  window.location.href="signin.html"
            }
            else
            {
              alert("This Account Already Exist")
            }
           
        }
        else{
            let massage=document.createElement('p')
            massage.innerText="Weak Password"   
            massage.style.color="red"
                user_alert.append(massage)
                setTimeout(()=>{
                  location.reload()
                },1000)
        }
       }else{
        alert("All Field must be filled out")

        setTimeout(()=>{
          location.reload()
        },1)
       }

          
            
}

function checkFrom(userData){
    let check=0
  for(let key in userData)
  {
      if(userData[key]=="")
      {
          check=1
      }
  }
  if(check==0)
  {
    return true
}
else{
   return false

}

}


function chekSpicalsymbol(password){
   let str="!@#$%^&*"
      let check=false;
     for(let i=0; i<str.length; i++)
     {
       for(let j=0; j<password.length; j++)
       {
          if(str[i]===password[j])
          {
             check=true
          }
       }
     }

     if(check===true && password.length>=6)
     {
         return true
     }
     else{
        return false
     }
}

function checkEmail(email){

  let filterData=signupDatafromLs.filter(function(el){
        return  el.email===email
    })

    if(filterData.length>0)
    {
      return false
    }
    else
    {
       return true
    }
      
}


let  showbtan=document.querySelector('#login')

 showbtan.addEventListener('click',()=>{
    document.querySelector('.overlay').classList.add('showoverlay')
      document.querySelector('.loginform').classList.add('showloginform')
 })

 let closeLogin=document.querySelector('.loginform>span')

 closeLogin.addEventListener('click',()=>{
  document.querySelector('.overlay').classList.add('closeoverlay')
  document.querySelector('.loginform').classList.add('closeloginform')
  
  setTimeout(()=>{
    
    location.reload()
    },1000)
 })

 let registerLoginbtn=document.querySelector('#form a')

 registerLoginbtn.addEventListener('click',()=>{
  document.querySelector('.overlay').classList.add('showoverlay')
      document.querySelector('.loginform').classList.add('showloginform')
 })

//  login code start here///


let form_login=document.querySelector("#form_page")

form_login.addEventListener("submit", (event)=>{
  event.preventDefault()
    let userData={
      userName:form_login.user_name1.value,
      password:form_login.password1.value
      }

        
      if(checkEmailPassword(userData.userName,userData.password)==true)
      {

        
          alert("Login Successful")
          window.location.href="./home.html"
      }
      else
      {
          alert("Login Failed Wrong User Credentials")
      }
   })

    function checkEmailPassword(userName,password){
             
         
           let check=false
           signupDatafromLs.forEach(function(el){
           
           if(el.userName===userName && el.password===password)
           {
                check=true
           
              
           }
       })

       if(check==true)
       {
         return true
        }
        else{
          return false
        }
      }
      
    

   let Image=document.querySelector('#link')
      Image.addEventListener('click',()=>{
        window.location.href="./home.html"
      })

       