const { UserModel } = require("../model/user.model");



const uniqueMail = async(req,res,next) => {
    try{
        const {email} = req.body;
        let data = await UserModel.find({email});
        if(data.length>=1){
            res.send({'msg':'Email-id already registered'});
        }else{
            next();
        }
    }catch(err){
        res.send(err);
    }
}



module.exports = {uniqueMail};