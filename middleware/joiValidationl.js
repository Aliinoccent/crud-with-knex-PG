const e = require('express');
const Joi = require('joi');
const validation = (req,res,next) => {
    try {
        const schema = Joi.object({
            user_name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string(),
            age: Joi.number().min(1).max(120)
        })
        const userschema = schema.validate(req.body);
        if (userschema.error) {
            console.error('Validation error:', validationResult.error.message);
            return res.status(400).json({ status: false, messege: userschema.error.message });
        }
        next();
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({ status: false, messege: "server error in joi val" });
    }
}
module.exports = validation;