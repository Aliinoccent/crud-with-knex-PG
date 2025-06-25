const knex = require("../config/db/database")
const { hashPas } = require('../utility/hash');
const { generateToken } = require("../utility/jwt");
exports.signup = async (req, res) => {
    const { user_name, age, email, password } = req.body;
    try {
        const hash = await hashPas(password);
        console.log(hash);
        const isExist = await knex('users').where({ email }).first();
        if (isExist) {
            return res.status(404).json({ status: false, messege: "user already exist" });
        }

        const newuser = await knex("users").insert({ user_name, email, password: hash, age })
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
        const dbUser = await knex("users").where({ email }).first();
        if (!dbUser) {
            return res.status(401).json("user not found");
        }
        const token =await generateToken(email);
        return res.status(200).json({ status: true, token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}