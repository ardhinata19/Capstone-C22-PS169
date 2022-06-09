const InvariantException = require('../../exceptions/InvariantException');
const {ReportPayloadSchema} = require('./schema');

const ReportValidator = {
    validatePredictReportPayload: (payload) => {
        const validationResult = ReportPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantException(validationResult.error.message);
        }
    },
};

module.exports = ReportValidator;
