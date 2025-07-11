const { EvmChain } = require("@moralisweb3/common-evm-utils");
const Moralis = require("moralis").default;
const chain = EvmChain.BASE;
const knex = require("../config/db/database");
require('dotenv').config();
const service = require('../services/moralis')
exports.getBalance = async (req, res) => {
    try {
        service.getBalance(req, res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, messege: "server error" });
    }
}
exports.walletBalance = async (req, res) => {
    try {
        service.walletBalance(req, res);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, messege: "server error" })
    }
}
exports.nftsBalance = async (req, res) => {
    try {
        service.nftsBalance(req, res);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, messege: "server error" })
    }
}
exports.getTokenHistory = async (req, res) => {
    try {
        service.getTokenHistory(req, res);
    }
    catch (error) {
        console.log(error)
    }
}
exports.depositTokenPrice = async (req, res) => {
    try {
        service.depositTokenPrice(req, res);
    } catch (error) {
        res.status(500).json({ messege: 'server error' })
    }
}
exports.userGraph = async (req, res) => {
    try {
        service.userGraph(req, res);
    }
    catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
