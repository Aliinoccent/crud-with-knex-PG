require('dotenv').config();
// const db=require("./config/db/database")
const mainRouters =require('./routers/index.route');
const express=require("express");
const Moralis_connection=require('./config/moralis/moralis')
const precitce=require('./prectice only/prectic1')

const morgan =require('morgan');
const app=express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/",mainRouters);
Moralis_connection();

precitce.trunk();
const port=process.env.PORT|| 5002;
app.listen(port,()=>{
console.log("app listen on port :",port)
});