const Joi = require('joi');

exports.signupValidation = {
    payload: {
        userName: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(3).max(100).required(),
    }
}

exports.loginValidation = {
    payload: {
        email: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(3).max(100).required(),
    }
}


exports.subscribeValidation = {
    payload: {
        feedUrl: Joi.string().required(),
        source_id: Joi.number()
    }
}


exports.unsubscribeValidation = {
    payload: {
        source_id: Joi.number().required(),
    }
}