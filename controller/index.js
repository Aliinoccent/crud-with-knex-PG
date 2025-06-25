const {createUsers,getAllUsers,getById,deleteUserById,updateUser}=require('../controller/users');
const { signup, login } = require('./auth');
const {getBalance,walletBalance,nftsBalance,getAllBalances}=require('./moralis');
module.exports={
    createUsers,
    getAllUsers,
    getById,
    deleteUserById,
    updateUser,
    signup,
    login,
    getBalance,
    walletBalance,
    nftsBalance,
    getAllBalances,
}