

const express=require('express');
const controller=require("../controller/index")
const authentication=require("../middleware/authentication")
const app=express.Router();
app.get("/getBalance",controller.getBalance);
app.get('/walletBalance',controller.walletBalance);
app.get('/nftBalance',controller.nftsBalance);
app.get ('/tokenHistory',authentication,controller.getTokenHistory);
app.post ('/deposit',authentication,controller.depositTokenPrice);
app.get('/userGraph',authentication,controller.userGraph)



module.exports=app;