const Joi = require('joi');

const ReportPayloadSchema = Joi.object({
    disease_Id: Joi.string().required(),
    image: Joi.string().required(),
    accuracy: Joi.number().required(),
});

module.exports = {ReportPayloadSchema};