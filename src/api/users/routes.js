const routes = (handler) => [
    {
        method: 'POST',
        path: '/users',
        handler: handler.addUserHandler,
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: handler.getUserByIdHandler,
    },
    {
        method: 'GET',
        path: '/users',
        handler: handler.getAllUsersHandler,
    },
    {
        method: 'GET',
        path: '/user/{username}',
        handler: handler.getUsersByUsernameHandler,
    },
];

module.exports = routes;
