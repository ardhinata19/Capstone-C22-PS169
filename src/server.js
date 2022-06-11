require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// Users
const users = require('./api/users');
const UsersService = require('./services/UsersService');
const UsersValidator = require('./validator/users');

//Auth
const login = require('./api/login');
const LoginService = require('./services/LoginService');
const GenerateToken = require('./token/GenerateToken');
const LoginValidator = require('./validator/login');

//Eye Diseases
const eyeDiseases = require('./api/diseases');
const EyeDiseasesService = require('./services/EyeDiseasesService');
const EyeDiseasesValidator = require('./validator/diseases');

//Articles
const articles = require('./api/articles');
const ArticlesService = require('./services/ArticlesService');
const ArticleValidator = require('./validator/articles');

//Report Predictions
const reports = require('./api/reports');
const ReportsService = require('./services/ReportPredictService');
const ReportValidator = require('./validator/reports');


const init = async () => {
    const usersService = new UsersService();
    const loginService = new LoginService();
    const eyeDiseasesService = new EyeDiseasesService();
    const articlesService = new ArticlesService();
    const reportsService = new ReportsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    await server.register([
        {
            plugin: Jwt,
        },
    ]);

    server.auth.strategy('fitid-jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (token) => ({
            isValid: true,
            credentials: {
                id: token.decoded.payload.id,
            },
        }),
    });

    await server.register([

        {
            plugin: login,
            options: {
                loginService,
                usersService,
                GenerateToken: GenerateToken,
                validator: LoginValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
        {
            plugin: eyeDiseases,
            options: {
                service: eyeDiseasesService,
                validator: EyeDiseasesValidator,
            },
        },
        {
            plugin: articles,
            options: {
                service: articlesService,
                validator: ArticleValidator,
            },
        },
        {
            plugin: reports,
            options: {
                reportsService,
                eyeDiseasesService,
                validator: ReportValidator,
            },
        },
    ]);

    await server.start();
    console.log(`Server running at ${server.info.uri}`);
}
init();
