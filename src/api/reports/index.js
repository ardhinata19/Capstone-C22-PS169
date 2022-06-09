const ReportsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'reports',
    version: '1.0.0',
    register: async (server, {reportsService, eyeDiseasesService, validator}) => {
        const reportsHandler = new ReportsHandler(
            reportsService, eyeDiseasesService, validator,
        );

        server.route(routes(reportsHandler));
    },
};
