const Joi = require('joi');

const EyeDiseasePayloadSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    imageDiseases: Joi.string().required(),
});

module.exports = {EyeDiseasePayloadSchema};