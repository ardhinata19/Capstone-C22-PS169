const {
    LoginPayloadSchema,
    UpdateLoginPayloadSchema,
    DeleteLoginPayloadSchema,
} = require('./schema');
const InvariantExceptionError = require('../../exceptions/InvariantException');

const AuthenticationsValidator = {
    validateLoginPayload: (payload) => {
        const validationResult = LoginPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantExceptionError(validationResult.error.message);
        }
    },
    validateUpdateLoginPayload: (payload) => {
        const validationResult = UpdateLoginPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantExceptionError(validationResult.error.message);
        }
    },
    validateDeleteLoginPayload: (payload) => {
        const validationResult = DeleteLoginPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantExceptionError(validationResult.error.message);
        }
    },
};

module.exports = AuthenticationsValidator;
