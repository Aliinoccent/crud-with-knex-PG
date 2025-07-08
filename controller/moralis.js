const { EvmChain } = require("@moralisweb3/common-evm-utils");
const Moralis = require("moralis").default;
const chain = EvmChain.BASE;
const knex = require("../config/db/database");
require('dotenv').config();
const axios = require('axios');

exports.getBalance = async (req, res) => {
    const { address } = req.body;
    try {
        const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
            address,
            chain,
        });
        balance = nativeBalance.toJSON().balance;
        const isaddress = await knex("moralis").select('*').where({ address }).first();
        if (!isaddress) {
            const balance = await knex("moralis").insert({ nativeBalance: balance }).returning("nativeBalance")
            return res.status(200).json({ status: true, messege: balance })
        }
        if (isaddress && isaddress.nativeBalance !== nativeBalance) {
            await knex("moralis").where({ address }).update({ nativeBalance: balance })
            return res.status(200).json({ status: true, messege: nativeBalance });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, messege: "server error" });
    }
}
exports.walletBalance = async (req, res) => {
    const { address } = req.body;
    try {

        const walletBalance = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,

        });
        const balance = walletBalance.raw[0].balance;

        console.log(balance, 'this is balance here');
        if (balance === undefined) {
            return res.status(400).json({ status: false, messege: "balnce empty" })
        }
        const isaddress = await knex("moralis").select('*').where({ address }).first();
        if (!isaddress) {
            const dbBalance = await knex("moralis").insert({ address, walletBalance: balance }).returning("WalletBalance")
            return res.status(200).json({ status: true, messege: dbBalance })
        }

        if (isaddress && isaddress.walletBalance !== walletBalance) {
            await knex("moralis").where({ address }).update({ walletBalance: balance })
            return res.status(200).json({ status: true, messege: balance });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, messege: "server error" })
    }
}

exports.nftsBalance = async (req, res) => {
    const { address } = req.body;
    try {

        const nftsBalances = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            limit: 10,
        });
        return res.status(200).json(nftsBalances)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, messege: "server error" })
    }
}
exports.getTokenHistory = async (req, res) => {
    const { tokenAddress, chai } = req.body;
    try {
        if (!tokenAddress) {
            return res.status(400).json({ status: false, messege: "required token field" })
        }
        // if (!chain) {
        //     return res.status(400).json({ status: false, messege: "required chain" })
        // }
      
        // GET HITOROY OF TOKEN BY COVELENT API KIY 
        const API_KEY = process.env.COVELANT_API_KEY; // your apiKey
        const CURRENCY = "Ebaseth";
        const chainName = 8453; // we will check price of BTC in this sample
        const DATE1 = "2024-07-07"; // Start date
        const DATE2 = "2025-07-07"; // End date
        let saveData;
    
        const options = { method: 'GET', headers: { Authorization: `Bearer ${API_KEY}`} };
console.log(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/USD/${tokenAddress}/?from=${DATE1}&to=${DATE2}`)
        fetch(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/USD/${tokenAddress}/?from=${DATE1}&to=${DATE2}&prices-at-asc=true`, options)
            .then(response => response.json())
            .then(data =>{ console.log(data)
                let arr =[]
                data.data.forEach((value , index) =>{
                   value.prices.forEach(price=>{
                
                    arr.push({price: price.price , date:price.date});
                   })
                })
          
    
        return res.json({result:"one year result",arr})
        
    })
            .catch(err => console.error(err));
            const save=await   knex("History",).insert({tokenAddress,created_at:new Date(),chain:chainName}).returning("tokenAddress");
                  console.log('save',save);
    }

    catch (error) {
        console.log(error)
    }
}
