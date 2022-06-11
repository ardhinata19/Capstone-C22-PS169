const EyeDiseasesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'diseases',
    version: '1.0.0',
    register: async (server, {service, validator}) => {
        const eyeDiseasesHandler = new EyeDiseasesHandler(service, validator);
        server.route(routes(eyeDiseasesHandler));
    },
};
