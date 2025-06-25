

const express=require('express');
const controller=require("../controller/index")
app=express.Router();
app.get("/getBalance",controller.getBalance);
app.get('/walletBalance',controller.walletBalance);
app.get('/nftBalance',controller.nftsBalance);




module.exports = app;