const jwt = require('jsonwebtoken');

exports.generateToken=(email)=>{
    try {
        const token =jwt.sign(email,process.env.KEY);
        return token ;
    } catch (error) {
        return error
    }
}