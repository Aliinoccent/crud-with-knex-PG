const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.generateToken=(email)=>{
    try {
        const token =jwt.sign({email},process.env.KEY,{expiresIn:'7d'});
        return token ;
    } catch (error) {
        return error
    }
}