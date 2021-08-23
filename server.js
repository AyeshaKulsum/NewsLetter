var Hapi = require('hapi');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const articlesRoute = require('./routes/articles')
const userRoute = require('./routes/user')
var server = new Hapi.Server()
const port = process.env.PORT || 8000;
const HapiAuthCookie = require('hapi-auth-cookie');
const Session = require('./model/session')
const Vision = require('vision');
const Bell = require('bell');

const User = require('./model/user')
const Source = require('./model/source')
const Article = require('./model/article')
const UserSourceMapping = require('./model/usersourcemapping')
const task = require('./config/cronjobs')
const { elasticSearchClient } = require('./config/elasticsearch')

//DB
const db = require('./config/database');
const { sessionHelper } = require('./handlers/user');
const sourcesRoute = require('./routes/sources');
db.authenticate().then(() =>
    console.log('DB Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))
db.sync({ force: false })
const d = { Session, User, Source, Article, UserSourceMapping }

Object.keys(d).forEach(modelName => {
    if (d[modelName].associate) {
        d[modelName].associate(d);
    }
});
const init = async () => {
    // add server’s connection information
    await server.connection({
        host: process.env.HOST,
        port,
        routes: {
            //CORS by default false we can enable while creating server or write in each routes directly with or without properties
            cors: true
            ,
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
        }
    })
    await server.register(Bell);
    await server.register(HapiAuthCookie);

    server.register(Vision, (err) => {
        if (err) {
            throw err;
        }
        server.views({
            engines: {
                ejs: require("ejs")
            },
            path: `${__dirname}/views`
        })
    });

    server.auth.strategy('google', 'bell', {
        provider: process.env.PROVIDER_GOOGLE,
        password: process.env.GOOGLE_PASSWORD,
        isSecure: false,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        location: process.env.GOOGLE_LOCATION
    });

    server.auth.strategy('session', 'cookie', {
        password: process.env.COOKIE_PASSWORD,
        redirectTo: '/',
        isSecure: false,
        isSameSite: 'Lax',

        validateFunc: async function (request, session, callback) {

            const db_session = await Session.findOne({
                where: {
                    id: session.id
                }
            });

            if (db_session === null) {
                return callback(null, false);
            }

            return callback(null, true, session);

        }
    })

    server.state('session', {
        ttl: 30 * 24 * 60 * 60 * 1000,     // 30 days
        isSecure: false,
        isHttpOnly: false,
        isSameSite: 'Lax',
        path: '/',
        encoding: 'base64json'
    });

    //ON REQUEST 
    server.ext('onRequest', function (request, reply) {
        console.log(`onRequest:${request.method.toUpperCase()}:${request.path}/${request.params}`)
        console.log(`onRequest:${request.method.toUpperCase()}:${request.path}/${request.params}`)
        return reply.continue();
    });

    // ON PREAUTH 
    server.ext('onPostAuth', function (request, reply) {
        console.log(`onPostAuth:${request.method.toUpperCase()}:${request.path}/${request.params}`)
        if (request.path === '/auth/google' || request.path === '/login' || request.path === '/signup' || request.auth.isAuthenticated) {
            return reply.continue();
        } else {
            console.log(false)
            return reply.redirect('/login')
        }
    });

    // tell your server about the defined routes
    server.route(articlesRoute);
    server.route(userRoute);
    server.route(sourcesRoute);

    // start your server
    server.start(function (err) {
        if (err) {
            throw err
        }

        console.log('Server running at: ' + server.info.uri)
    })

}

init()
process.on('unhandledRejection', (err) => {
    console.log('Error :', err);
})

module.exports = server;