const express=require('express');
const app =express.Router();
const controller=require("../controller/index");
const {validationSignup,validationLogin}= require('../middleware/joiValidationl')
app.post('/signup',validationSignup,controller.signup);
app.post ('/login',validationLogin,controller.login);

module.exports =app;
