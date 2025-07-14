const { EvmChain } = require("@moralisweb3/common-evm-utils");
const Moralis = require("moralis").default;
const chain = EvmChain.BASE;
const knex = require("../config/db/database");
require('dotenv').config();
const service = require('../services/moralis')
const Response = require('../utility/response')
exports.getBalance = async (req, res,next) => {

    service.getBalance(req, res).then(resp => {
        return Response.send.Raw(res, resp.status, resp.body);
    }).catch(error => {
        // console.log(error)
        // return res.status(500).json(error)
        next(error)
    })
}
exports.walletBalance = async (req, res,next) => {
    service.walletBalance(req, res).then(resp => {
        return Response.send.Raw(res, resp.status, resp.body);
    }).catch(error => {
            // console.log(error)
            // return res.status(500).json(error)
            next(error)
        })
}
exports.nftsBalance = async (req, res , next) => {
    service.nftsBalance(req, res).then(resp => {
        return Response.send.Raw(res, resp.status, resp.body);
    }).catch(error => {
        // console.log(error)
        // return res.status(500).json(error)
        next(error)
    })
}
exports.getTokenHistory = async (req, res , next) => {

    service.getTokenHistory(req, res).then(resp => {
        return Response.send.Raw(res, resp.status, resp.body);
    }).catch(error => {
        // console.log(error)
        // return res.status(500).json(error)
        next(error)
    })
}
exports.depositTokenPrice = async (req, res , next) => {
    service.depositTokenPrice(req, res).then(resp => {
        return Response.send.Raw(res, resp.status, resp.body);
    }).catch(error => {
        // console.log(error)
        // return res.status(500).json(error)
        next(error);
    })
}

exports.userGraph = async (req, res , next) => {

    service.userGraph(req, res).then(resp => {
        return Response.send.Raw(res, resp.status, resp.body);
    }).catch(error => {
        // console.log(error)
        // return res.status(500).json(error)
        next(error);
    })

}
