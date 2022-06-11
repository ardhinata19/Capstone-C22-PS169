const Joi = require('joi');

const ArticlePayloadSchema = Joi.object({
    title: Joi.string().required(),
    article_url: Joi.string().required(),
});

module.exports = {ArticlePayloadSchema};