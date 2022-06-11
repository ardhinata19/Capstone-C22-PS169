const Joi = require('joi');

const LoginPayloadSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const UpdateLoginPayloadSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

const DeleteLoginPayloadSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

module.exports = {
    LoginPayloadSchema,
    UpdateLoginPayloadSchema,
    DeleteLoginPayloadSchema,
};
