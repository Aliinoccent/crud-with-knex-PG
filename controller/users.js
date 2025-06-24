const knex = require("../config/db/database")
exports.createUsers = async (req, res) => {
    const { name, age } = req.body

    try {
        if (!name || !age) {
            return res.status(404).json({ status: false, messege: "all field are required" })
        }
        knex("users").insert({ user_name: name, age }).then((result) => {
            return res.status(200).json({ status: true, messege: "successfull" })
        }).catch(error => {
            console.log(error)
            return res.json(401).json({ status: false, messege: "unsuccfull " })
        })

    } catch (error) {
        console.log(error);
        return res.json({ error })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const data = await knex("users").select("*");
        if (!data) {
            return res.status(404).json({ status: false, messege: "empty list" });
        }
        return res.status(200).json({ status: true, messege: data });

    } catch (error) {
        return res.status(500).json({ status: false, messege: "server error", error })
    }
}
exports.getById = async (req, res) => {
    try {
        const id = req.params.id || undefined;

        // if(id===undefined){
        //     return res.status(400).json({status:false,message:"id requied in params"});
        // }
        const userFound = await knex('users').where({ id: id }).first();
        if (!userFound) {
            return res.status(404).json({ status: false, messege: "user not found" });
        }
        return res.status(200).json({ status: true, messege: userFound });

    } catch (error) {
        return res.status(500).json({ status: false, messege: "server error in get by id api" })
    }
}
exports.deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const userFound = await knex('users').where({ id }).first();
        if (!userFound) {
            return res.status(404).json({ status: false, messege: "user not found" });

        }
        await knex('users').where({ id }).del();
        return res.status(200).json({ status: true, messege: "user delete successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, messege: "server side error" })
    }
}
exports.updateUser=async(req,res)=>{
    const updates=req.body;
    const id=req.params.id;
    try {
        console.log(updates)
       const user= await knex("users").where({id:id}).first();
       console.log(user);
        if(!user){
            return res.status(400).json({status:false,messege:"user not found"});
        }
        
        await knex("users").where({id}).update(updates);
        return res.status(200).json({status:true,messege:"user update succesfully"});
    } catch (error) {
        return res.status(500).json({status:false ,messege:"server error"})
    }
}