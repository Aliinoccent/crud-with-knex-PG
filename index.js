require('dotenv').config();
// const db=require("./config/db/database")
const mainRouters =require('./routers/index.route');
const express=require("express");
const app=express();
app.use(express.json());
app.use("/",mainRouters);
const port=process.env.PORT|| 5002;

app.listen(port,()=>{
console.log("app listen on port :",port)
});