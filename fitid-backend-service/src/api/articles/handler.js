const ServerErrorCheck = require('../../ServerErrorCheck/ServerErrorCheck');

class ArticlesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this._ServerErrorCheck = ServerErrorCheck;

        this.addArticlesHandler = this.addArticlesHandler.bind(this);
        this.getAllArticlesHandler = this.getAllArticlesHandler.bind(this);
        this.getArticleByIdHandler = this.getArticleByIdHandler.bind(this);
        this.updateArticleByIdHandler = this.updateArticleByIdHandler.bind(this);
        this.deleteArticleByIdHandler = this.deleteArticleByIdHandler.bind(this);

    }

    async addArticlesHandler(request, h) {
        try {
            this._validator.validateArticlePayload(request.payload);

            const {title, article_url} = request.payload;
            const articleId = await this._service.addArticle({title, article_url});

            const response = h.response({
                status: 'success',
                message: 'Article added successfully',
                data: {
                    articleId,
                }
            });

            response.code(201);
            return response;
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async getAllArticlesHandler() {
        const articles = await this._service.getAllArticles();
        return {
            status: 'success',
            data: {
                articles,
            },
        };
    }

    async getArticleByIdHandler(request, h) {
        try {
            const {id} = request.params;

            const article = await this._service.getArticleById(id);

            const response = h.response({
                status: 'success',
                data: {
                    article,
                }
            });

            response.code(200);
            return response;
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async updateArticleByIdHandler(request, h) {
        try {
            const {id} = request.params;
            this._validator.validateArticlePayload(request.payload);

            await this._service.updateArticleById(id, request.payload);
            return {
                status: 'success',
                message: 'Article has been changed',
            };
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

    async deleteArticleByIdHandler(request, h) {
        try {
            const {id} = request.params;
            await this._service.deleteArticleById(id);
            return {
                status: 'success',
                message: 'Article has been successfully removed',
            };
        } catch (error) {
            return this._ServerErrorCheck.errorHandler(h, error);
        }
    }

}

module.exports = ArticlesHandler;