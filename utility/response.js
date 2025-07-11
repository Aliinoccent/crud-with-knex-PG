const send =(res,status,body=null)=>res.status(status).json(body)
module.exports={
    send:{
        Raw:(res,status,body)=>send(res,status,body)
    }
    }
