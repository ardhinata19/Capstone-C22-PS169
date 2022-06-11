const ServerErrorCheck = require('../../ServerErrorCheck/ServerErrorCheck');

class DiseasesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this._ServerErrorCheck = ServerErrorCheck;

        this.addEyeDiseaseHandler = this.addEyeDiseaseHandler.bind(this);
        this.getAllEyeDiseasesHandler = this.getAllEyeDiseasesHandler.bind(this);
        this.getEyeDiseaseByIdHandler = this.getEyeDiseaseByIdHandler.bind(this);
        this.updateEyeDiseaseByIdHandler = this.updateEyeDiseaseByIdHandler.bind(this);
        this.deleteEyeDiseaseByIdHandler = this.deleteEyeDiseaseByIdHandler.bind(this);

    }

    // async addEyeDiseaseHandler(request, h) {
    //     try {
    //         this._validator.validateEyeDiseasePayload(request.payload);
    //
    //         const {title, description, imageDiseases} = request.payload;
    //         const diseaseId = await this._service.addEyeDisease({title, description, imageDiseases});
    //
    //         const response = h.response({
    //             status: 'success',
    //             message: 'Disease added successfully',
    //             data: {
    //                 diseaseId,
    //             }
    //         });
    //
    //         response.code(201);
    //         return response;
    //     } catch (error) {
    //         return this._ServerErrorCheck.errorHandler(h, error);
    //     }
    // }

    async addEyeDiseaseHandler(request, h) {
        try {
            this._validator.validateEyeDiseasePayload(request.payload);

            const {title, description, imageDiseases} = request.payload;
            const diseaseId = await this._service.addEyeDisease({title, description, imageDiseases});

            const response = h.response({
                status: 'success',
                message: 'Disease added successfully',
                data: {
                    diseaseId,
                }
            });

            response.code(201);
            return response;
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async getAllEyeDiseasesHandler() {
        const eyeDiseases = await this._service.getAllEyeDiseases();
        return {
            status: 'success',
            data: {
                eyeDiseases,
            },
        };
    }

    async getEyeDiseaseByIdHandler(request, h) {
        try {
            const {id} = request.params;

            const eyeDisease = await this._service.getEyeDiseaseById(id);

            const response = h.response({
                status: 'success',
                data: {
                    eyeDisease,
                }
            });

            response.code(200);
            return response;
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async updateEyeDiseaseByIdHandler(request, h) {
        try {
            const {id} = request.params;
            this._validator.validateEyeDiseasePayload(request.payload);

            await this._service.updateEyeDiseaseById(id, request.payload);
            return {
                status: 'success',
                message: 'Disease has been changed',
            };
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async deleteEyeDiseaseByIdHandler(request, h) {
        try {
            const {id} = request.params;
            await this._service.deleteEyeDiseaseById(id);
            return {
                status: 'success',
                message: 'Disease has been successfully removed',
            };
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

}

module.exports = DiseasesHandler;