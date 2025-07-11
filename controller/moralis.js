const { EvmChain } = require("@moralisweb3/common-evm-utils");
const Moralis = require("moralis").default;
const chain = EvmChain.BASE;
const knex = require("../config/db/database");
require('dotenv').config();
const axios = require('axios');
const { response } = require("express");

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
    const { tokenAddress, tokenName } = req.body;
    const obj = req.user
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
        const chainName = 1; // ETHERUM CHAIN ID
        const DATE1 = "2024-07-07"; // Start date
        const DATE2 = "2025-07-07"; // End date
        let saveData;
        let arr = []
        const options = { method: 'GET', headers: { Authorization: `Bearer ${API_KEY}` } };
        console.log(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/USD/${tokenAddress}/?from=${DATE1}&to=${DATE2}`)
        const response = await fetch(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainName}/USD/${tokenAddress}/?from=${DATE1}&to=${DATE2}&prices-at-asc=true`, options)

        const data = await response.json();
        console.log(data);
        if (!data.error_message) {
            data.data.forEach((value, index) => {
                value.prices.forEach(price => {
                    arr.push({ price: price.price, date: price.date });
                })
            })
        } else {
            return res.status(400).json(data.error_message)

        }
        await Promise.all(
            arr.map(price_val => {
                return knex("History")
                    .insert({
                        tokenAddress,
                        created_at: new Date(),
                        chain: chainName,
                        price: Number(price_val.price),
                        History_created_at: price_val.date,
                        user_id: obj.id,
                        tokenName
                    })
            })
        ).then(response => console.log("data inserted"))
        return res.json({ result: "one year result", arr })
    }
    catch (error) {
        console.log(error)
    }
}
exports.depositTokenPrice = async (req, res) => {
    const { depositePrice } = req.body;
    const obj = req.user;
    try {
        if (!depositePrice) {
            return res.status(400).json({ messege: "required deposite price" });
        }
        if (depositePrice.length <= 0) {
            return res.status(404).json({ messege: "requied minimum 1 $" });
        }
        const db = await knex("deposit").insert({ user_id: obj.id, depositPrice: depositePrice }).returning()
        const pricesArr = await knex("History").select("price")

        pricesArr.forEach(item => {
            item.price = item.price / depositePrice
        })
        console.log(pricesArr);
        await Promise.all(
            pricesArr.map(item => {
                return knex("userGraph").insert({ graph_price: item.price, user_id: obj.id })
            })

        )
        return res.status(200).json({ status: true, messege: "db" });


    } catch (error) {
        res.status(500).json({ messege: 'server error' })
    }
}
exports.userGraph = async (req, res) => {
    const user = req.user;
    try {

        const userobj = await knex("History").join("userGraph", "userGraph.user_id", "History.user_id").select("price as historyPrice", "graph_price", "tokenName", "History_created_at").where("History.user_id", user.id);
        // console.log(userobj)



        const groupByPrice = await knex("History")
            .join("deposit", "History.user_id", "deposit.user_id")
            .select(
                "History_created_at",
                "deposit.depositPrice",
                knex.raw('"deposit"."depositPrice"/SUM("History"."price")  as "totalPrice"')
            ).where("History.user_id", user.id)
            .groupBy("History_created_at", "deposit.depositPrice")
            .orderBy("History_created_at", "asc");
        console.log(groupByPrice);
        return res.status(200).json(groupByPrice);

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
