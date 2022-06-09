const routes = (handler) => [
    {
        method: 'POST',
        path: '/predict/reports',
        handler: handler.addPredictReportHandler,
        options: {
            auth: 'fitid-jwt',
        },
    },
    {
        method: 'GET',
        path: '/predict/reports',
        handler: handler.getAllPredictReportByIdHandler,
        options: {
            auth: 'fitid-jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/predict/reports/{id}',
        handler: handler.deletePredictReportById,
        options: {
            auth: 'fitid-jwt',
        },
    },
];

module.exports = routes;
