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
        provider: 'google',
        password: 'A4BIqfMdODISkn8A70EQle2QQv4Obd2bf',
        isSecure: false,
        clientId: '1003676096517-48uaitqidv5dc71vbh94e6sbetdi63cq.apps.googleusercontent.com',
        clientSecret: 'mqoY2keZMmNhzIJtvQbnSLXt',
        location: 'http://localhost:8001'
    });



    server.auth.strategy('session', 'cookie', {
        password: 'A4BIqfMdODISkn8A70EQle2QQv4Obd2bf',
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
        if (request.path === '/login' || request.path === '/signup' || request.auth.isAuthenticated) {
            return reply.continue();
        } else {
            console.log(false)
            return reply.redirect('/login')
        }
    });

    // tell your server about the defined routes
    server.route({
        method: "GET",
        path: "/auth/google",
        config: {
            auth: {
                strategy: 'google',
            },
            handler: async (request, reply) => {
                if (request.auth.isAuthenticated) {
                    const user = request.auth.credentials.profile
                    let userDB = await User.findOne({
                        where: {
                            email: user.email
                        }
                    })
                    if (userDB) {
                        console.log(userDB)
                        Session.create({
                            access_token: request.auth.credentials.token,
                            user_id: userDB.id
                        }).then(session_data => {

                            const data = {
                                id: session_data.id,
                                user_id: session_data.user_id
                            }
                            request.cookieAuth.set(data);
                            reply.redirect('/').state('session', { loggedIn: true });
                        })
                    }
                    else {
                        User.create({ userName: user.displayName, email: user.email, password: 'GOOGLE_LOGIN', strategy: 'google' }).then(authData => {
                            console.log(authData)
                            Session.create({
                                access_token: request.auth.credentials.token,
                                user_id: authData.id
                            }).then(session_data => {
                                const data = {
                                    id: session_data.id,
                                    user_id: session_data.user_id
                                }
                                request.cookieAuth.set(data);
                                reply.redirect('/').state('session', { loggedIn: true });
                            })
                        })
                    }

                    // Session.create({
                    //     access_token:request.auth.credentials.token,
                    //     name: user.displayName,
                    //     username: user.username,
                    //     avatar: user.raw.avatar_url
                    // }).then(session_data => {
                    //     const data = {
                    //       id:session_data.id,
                    //       name: user.displayName,
                    //       username: user.username,
                    //       avatar: user.raw.picture
                    //     }
                    //     request.cookieAuth.set(data);
                    //     return reply.redirect('/').state('session',data);
                    //     // return reply.view('index',{
                    //     //     data,
                    //     //     title:"MovieBase",
                    //     //     host,
                    //     //     port:3000
                    //     // }).state('session',data);
                    //     // return reply.redirect('/login/success');
                    // }).catch(err => {
                    //     reply.view('login', {
                    //         error: 'There was an issue with the GitHub authentication.'
                    //       }).code(400)
                    // })

                }
                else {
                    reply.view('login', {
                        error: 'There was an issue with the GitHub authentication.'
                    }).code(400)
                }
            }
        }
    })
    server.route(articlesRoute);
    server.route(userRoute);

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