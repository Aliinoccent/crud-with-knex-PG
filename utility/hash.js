const bcrypt=require("bcrypt");

const salt=10;
const hashPas=async(plainPas)=>{
    try {
     const pas=await bcrypt.hash(plainPas,salt);
     return pas;
    } catch (error) {
        return error;
    }
}

const  verifyPas=async(hash,plain)=>{
    try {
        const isVerify=await bcrypt.compare(plain,hash);
        return isVerify;
    } catch (error) {
        return error;
    }
}
module.exports= {hashPas,verifyPas}