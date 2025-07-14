const errors=(err,req,res,next)=>{
    const {error, status}=err;
console.log("this is  error ",error);
res.status(status?status:500).json(error?error:'server error');
}
module.exports=errors;