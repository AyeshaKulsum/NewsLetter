const { sourcesToSubscribe, allSources } = require('../handlers/articles')

const AuthConfig = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: '/'
        }
    }
}

const sourcesRoute = [

    {
        method: 'GET',
        path: '/sources',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: sourcesToSubscribe,
            description: 'Gets all sources'
        }
    },
    {
        method: 'GET',
        path: '/fetch-all-sources',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: allSources,
            description: 'Gets all sources'
        }
    },
    {
        method: 'GET',
        path: '/all-sources',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,

            handler: (request, reply) => {
                reply.view('index')
            },
            description: 'Gets all sources'
        }
    },

]

module.exports = sourcesRoute;