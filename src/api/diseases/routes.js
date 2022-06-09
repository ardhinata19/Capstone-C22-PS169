const routes = (handler) => [
    {
        method: 'POST',
        path: '/diseases',
        handler: handler.addEyeDiseaseHandler,
    },
    {
        method: 'GET',
        path: '/diseases',
        handler: handler.getAllEyeDiseasesHandler,
    },
    {
        method: 'GET',
        path: '/diseases/{id}',
        handler: handler.getEyeDiseaseByIdHandler,
    },
    {
        method: 'PUT',
        path: '/diseases/{id}',
        handler: handler.updateEyeDiseaseByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/diseases/{id}',
        handler: handler.deleteEyeDiseaseByIdHandler,
    }
];

module.exports = routes;