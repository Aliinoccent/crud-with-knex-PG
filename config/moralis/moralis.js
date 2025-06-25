const Moralis=require('moralis').default;
require("dotenv").config();

const apiKey=process.env.MORALIS_API_KEY;
const Moralis_connection = async () => {
  await Moralis.start({
    apiKey,
  });}
module.exports=Moralis_connection;
