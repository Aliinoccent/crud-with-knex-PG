const jwt=require('jsonwebtoken');
const knex= require('../config/db/database')
const authentication=async (req,res ,next)=>{
    try {
        const auth= req.headers['authorization'];
        const token = auth &&  auth.split(' ')[1]
        console.log("this token",token);
        if(!token){
            return res.status(404).json({status:false,messege:"token required"});
        }
       const user_email=  jwt.verify(token,process.env.KEY);
       const userFound=await knex("users").select('*').where({email:user_email}).first();
       if(!userFound){
        return res.status(400).json({status:false , messege:"unauthrized access"})
    }
       console.log(user_email);
       req.user=userFound;
       next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({status:false,messege:"server error"});
    }
}
module.exports=authentication