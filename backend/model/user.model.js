const mongoose = require('mongoose');


// Creation of the Schema of the user is been done here..
const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    role : {
        type : String,
        enum : ['Admin','Player'],
        default : 'Player'
    },
    registered_on : {
        type : Date,
        default : Date.now
    }
},{
    versionKey : false
})



const UserModel = mongoose.model('users',userSchema);


module.exports = {UserModel};