const express =require('express');
const app=express();
const user=require('./user.route')
const auth=require('./auth.route');
app.use('/users',user);
app.use('/auth',auth)
module.exports =app;
