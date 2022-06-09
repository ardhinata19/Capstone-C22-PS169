const ServerErrorCheck = require('../../ServerErrorCheck/ServerErrorCheck');

class ReportsHandler {
    constructor(reportsService, eyeDiseasesService, validator) {
        this._reportsService = reportsService;
        this._eyeDiseasesService = eyeDiseasesService;
        this._validator = validator;
        this._ServerErrorCheck = ServerErrorCheck;

        this.addPredictReportHandler = this.addPredictReportHandler.bind(this);
        this.getAllPredictReportByIdHandler = this.getAllPredictReportByIdHandler.bind(this);
        this.deletePredictReportById = this.deletePredictReportById.bind(this);
    }

    async addPredictReportHandler(request, h) {
        try {
            this._validator.validatePredictReportPayload(request.payload);
            const {
                id: credentialsId
            } = request.auth.credentials;
            const {
                disease_Id,
                accuracy,
                image
            } = request.payload;

            await this._eyeDiseasesService.getEyeDiseaseById(disease_Id);
            const predictionHistoryId = await this._reportsService.addReportPredict(
                disease_Id,
                credentialsId,
                accuracy,
                image
            );

            const response = h.response({
                status: 'success',
                message: 'Prediction report has been added',
                data: {
                    predictionHistoryId,
                }
            });
            response.code(201);
            return response;
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async getAllPredictReportByIdHandler(request, h) {
        try {
            const {
                id: credentialsId
            } = request.auth.credentials;
            const predictReport = await this._reportsService.getAllReportPredictById(credentialsId);

            return {
                status: 'success',
                message: 'Prediction report retrieved successfully',
                data: {
                    predictReport,
                },
            };
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async deletePredictReportById(request, h) {
        try {
            const {
                id
            } = request.params;

            await this._reportsService.deleteReportPrediction(id);

            return {
                status: 'success',
                message: 'Prediction history has been deleted',
            };
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }
}

module.exports = ReportsHandler;