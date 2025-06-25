const knex = require("../config/db/database")
const { hashPas } = require('../utility/hash');
const {generateToken}=require("../utility/jwt");
exports.signup = async (req, res) => {
    const { user_name,age,email, password } = req.body;
    try {
        if (!user_name || !email || !password) {
            return res.status(400).json({ status: 200, messege: "all field are requireed" });
        }
        const hash =  await hashPas(password);
        console.log(hash);
        const isExist= await knex('users').where({email}).first();
        if(isExist){
            return res.status(404).json({status:false,messege:"user already exist"});
        }
        
        const newuser = await knex("users").insert({ user_name, email, password: hash,age })
        console.log(newuser)
        return res.status(200).json({ status: true, newuser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, messege: "server error" })
    }
}

exports.login = async (req, res) => {
    const { password, email } = req.body
    try {
        if (!password || !email) {
            return res.status(400).json({ messege: "all field are required" });
        }
        const dbUser = await  knex("users").where({email}).first();
        if (!dbUser) {
            return res.status(401).json("user not found");
        }
        const token = generateToken(email);
        
        
        res.status(200).json({ status:true, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}