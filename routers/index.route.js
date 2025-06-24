const express =require('express');
const app=express();
const user=require('./user.route')
app.use('/users',user);
module.exports =app;
