const ClientException = require("../exceptions/ClientException");

module.exports = {
    errorHandler: (h, error) => {
        if (error instanceof ClientException) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(error.statusCode);
            return response;
        }

        const response = h.response({
            status: 'error',
            message: 'Sorry, there was a failure on our server.',
        });
        response.code(500);
        console.error(error);
        return response;
    }
}