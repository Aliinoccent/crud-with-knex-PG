

const express=require('express');
const controller=require("../controller/index")
const app=express.Router();
app.get("/getBalance",controller.getBalance);
app.get('/walletBalance',controller.walletBalance);
app.get('/nftBalance',controller.nftsBalance);
app.get ('/tokenHistory',controller.getTokenHistory)



module.exports=app;