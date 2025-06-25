const express =require('express');
const app=express();
const user=require('./user.route')
const auth=require('./auth.route');
const moralis=require('./moralis.route');
app.use('/users',user);
app.use('/auth',auth)
app.use('/moralis',moralis);
module.exports =app;
