const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.generateToken=(email)=>{
    try {
        const token =jwt.sign(email,process.env.KEY);
        return token ;
    } catch (error) {
        return error
    }
}