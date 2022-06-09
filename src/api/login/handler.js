/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const ServerErrorCheck = require('../../ServerErrorCheck/ServerErrorCheck');

class LoginHandler {
    constructor(loginService, usersService, GenerateToken, validator) {
        this._loginService = loginService;
        this._usersService = usersService;
        this._GenerateToken = GenerateToken;
        this._validator = validator;
        this._serverErrorCheck = ServerErrorCheck;

        this.requestLoginHandler = this.requestLoginHandler.bind(this);
        this.updateLoginHandler = this.updateLoginHandler.bind(this);
        this.deleteLoginHandler = this.deleteLoginHandler.bind(this);
    }

    async requestLoginHandler(request, h) {
        try {
            this._validator.validateLoginPayload(request.payload);
            const {username, password} = request.payload;
            const id = await this._usersService.userLoginVerify(username, password);

            const accessToken = this._GenerateToken.generateAccessToken({id});
            const refreshToken = this._GenerateToken.generateRefreshToken({id});

            await this._loginService.addRefreshToken(refreshToken);
            const response = h.response({
                status: 'success',
                message: 'Authentication successful',
                data: {
                    accessToken,
                    refreshToken,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            return this._serverErrorCheck.errorHandler(h, error);
        }
    }

    async updateLoginHandler(request, h) {
        try {
            this._validator.validateUpdateLoginPayload(request.payload);

            const {refreshToken} = request.payload;
            await this._loginService.verifyRefreshToken(refreshToken);
            const {id} = this._GenerateToken.verifyRefreshToken(refreshToken);

            const accessToken = this._GenerateToken.generateAccessToken({id});
            return {
                status: 'success',
                message: 'Access token has been updated',
                data: {
                    accessToken,
                },
            };
        } catch (error) {
            return this._serverErrorCheck.errorHandler(h, error);
        }
    }

    async deleteLoginHandler(request, h) {
        try {
            this._validator.validateDeleteLoginPayload(request.payload);
            const {refreshToken} = request.payload;
            await this._loginService.verifyRefreshToken(refreshToken);
            await this._loginService.deleteRefreshToken(refreshToken);
            return {
                status: 'success',
                message: 'Refresh token has been removed',
            };
        } catch (error) {
            return this._serverErrorCheck.errorHandler(h, error);
        }
    }
}

module.exports = LoginHandler;
