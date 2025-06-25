const express=require('express');
const app =express.Router();
const controller=require("../controller/index");
const validation= require('../middleware/joiValidationl')
app.post('/signup',validation,controller.signup);
app.post ('/login',controller.login);
module.exports=app;
