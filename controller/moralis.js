const { EvmChain } = require("@moralisweb3/common-evm-utils");
const Moralis = require("moralis").default;
const chain = EvmChain.BASE;
const knex = require("../config/db/database");

exports.getBalance = async (req, res) => {
    const { address } = req.body;
    try {
        const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
            address,
            chain,
        });
        balance= nativeBalance.toJSON().balance;
        const isaddress = await knex("moralis").select('*').where({ address }).first();
        if (!isaddress) {
            const balance = await knex("moralis").insert({ nativeBalance:balance }).returning("nativeBalance")
            return res.status(200).json({ status: true, messege: balance })
        }
        if (isaddress && isaddress.nativeBalance !== nativeBalance) {
            await knex("moralis").where({ address }).update({ nativeBalance:balance})
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
        return res.status(500).json({status:false,messege:"server error"})
    }}

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

