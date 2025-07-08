const e = require('express');
const Joi = require('joi');
exports.validationSignup = (req,res,next) => {
    try {
        const schema = Joi.object({
            user_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
        const userschema = schema.validate(req.body);
        if (userschema.error) {
            console.error('Validation error:', userschema.error.message);
            return res.status(400).json({ status: false, messege: userschema.error.message });
        }
        next();
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({ status: false, messege: "server error in joi val" });
    }
}

exports.validationLogin = (req,res,next) => {
    try {
        const schema = Joi.object({

            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
        const userschema = schema.validate(req.body);
        if (userschema.error) {
            console.error('Validation error:', userschema.error.message);
            return res.status(400).json({ status: false, messege: userschema.error.message });
        }
        next();
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({ status: false, messege: "server error in joi val" });
    }
}
