const {createUsers,getAllUsers,getById,deleteUserById,updateUser}=require('../controller/users');
const { signup, login } = require('./auth');
module.exports={
    createUsers,
    getAllUsers,
    getById,
    deleteUserById,
    updateUser,
    signup,
    login
}