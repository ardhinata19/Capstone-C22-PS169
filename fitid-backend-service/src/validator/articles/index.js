const InvariantExceptionError = require('../../exceptions/InvariantException');
const {ArticlePayloadSchema} = require('./schema');

const ArticleValidator = {
    validateArticlePayload: (payload) => {
        const validationResult = ArticlePayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantExceptionError(validationResult.error.message);
        }
    },
};

module.exports = ArticleValidator;
