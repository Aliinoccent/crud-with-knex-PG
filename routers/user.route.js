const express=require('express');
const app=express.Router();
const controller=require("../controller/index")
const authentication =require('../middleware/authentication')

app.post('/',controller.createUsers);
app.get("/getAll",authentication,controller.getAllUsers);
app.get('/:id',authentication,controller.getById);
app.delete("/:id",authentication,controller.deleteUserById)
app.put('/:id',authentication,controller.updateUser);
module.exports =app;