


const authorize = (permittedRole) => {
    return (req,res,next) => {
        if(permittedRole.includes(role)){
            next();
        }else{
            res.send('You are not authorized!!')
        }
    }
}


module.exports = {authorize}