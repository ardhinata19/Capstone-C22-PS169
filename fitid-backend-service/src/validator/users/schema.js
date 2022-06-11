const Joi = require('joi');

const UserPayloadSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    imageProfile: Joi.string(),
});

module.exports = {UserPayloadSchema};
