const InvariantExceptionError = require('../../exceptions/InvariantException');
const {UserPayloadSchema} = require('./schema');

const UsersValidator = {
    validateUserPayload: (payload) => {
        const validationResult = UserPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantExceptionError(validationResult.error.message);
        }
    },
};

module.exports = UsersValidator;

