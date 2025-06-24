const kenx=require('knex');
const knexfile=require('../../knexfile');
const db=kenx(knexfile)
module.exports=db;