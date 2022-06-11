const routes = (handler) => [
    {
        method: 'POST',
        path: '/login',
        handler: handler.requestLoginHandler,
    },
    {
        method: 'PUT',
        path: '/auth',
        handler: handler.updateLoginHandler,
    },
    {
        method: 'POST',
        path: '/auth/delete',
        handler: handler.deleteLoginHandler,
    },
];

module.exports = routes;
