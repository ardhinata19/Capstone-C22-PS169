/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const ServerErrorCheck = require('../../ServerErrorCheck/ServerErrorCheck');

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this._ServerErrorCheck = ServerErrorCheck;

        this.addUserHandler = this.addUserHandler.bind(this);
        this.getAllUsersHandler = this.getAllUsersHandler.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
        this.getUsersByUsernameHandler = this.getUsersByUsernameHandler.bind(this);
    }

    async getAllUsersHandler() {
        const users = await this._service.getAllUser();
        return {
            status: 'success',
            data: {
                users,
            },
        };
    }

    async addUserHandler(request, h) {
        try {
            this._validator.validateUserPayload(request.payload);

            const {
                firstName, lastName, email, username, password, imageProfile
            } = request.payload;

            const userId = await this._service.addUser({
                firstName, lastName, email, username, password, imageProfile,
            });

            const response = h.response({
                status: 'success',
                message: 'User added successfully',
                data: {
                    userId: userId,
                },
            });

            response.code(201);
            return response;
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async getUserByIdHandler(request, h) {
        try {
            const {id} = request.params;
            const user = await this._service.getUserById(id);

            return {
                status: 'success',
                data: {
                    user,
                },
            };
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async getUsersByUsernameHandler(request, h) {
        try {
            const {username} = request.params;
            const user = await this._service.getUsersByUsername(username);
            return {
                status: 'success',
                data: {
                    user,
                },
            };
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }
}

module.exports = UsersHandler;
