const express=require('express');
const app=express.Router();
const controller=require("../controller/index")

app.post('/',controller.createUsers);
app.get("/getAll",controller.getAllUsers);
app.get('/:id',controller.getById);
app.delete("/:id",controller.deleteUserById)
app.put('/:id',controller.updateUser);
module.exports =app;