const routes = (handler) => [
    {
        method: 'POST',
        path: '/articles',
        handler: handler.addArticlesHandler,
    },
    {
        method: 'GET',
        path: '/articles',
        handler: handler.getAllArticlesHandler,
    },
    {
        method: 'GET',
        path: '/articles/{id}',
        handler: handler.getArticleByIdHandler,
    },
    {
        method: 'PUT',
        path: '/articles/{id}',
        handler: handler.updateArticleByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/articles/{id}',
        handler: handler.deleteArticleByIdHandler,
    }
];

module.exports = routes;