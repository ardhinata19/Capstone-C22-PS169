const InvariantExceptionError = require('../../exceptions/InvariantException');
const {EyeDiseasePayloadSchema} = require('./schema');

const EyeDiseaseValidator = {
    validateEyeDiseasePayload: (payload) => {
        const validationResult = EyeDiseasePayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantExceptionError(validationResult.error.message);
        }
    },
};

module.exports = EyeDiseaseValidator;
