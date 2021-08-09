const { fetchAllArticles, sourcesToSubscribe, fetchOneArticles } = require('../handlers/articles')

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

const articlesRoute = [
    {
        method: 'GET',
        path: '/',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            handler: (request, reply) => {
                console.log('request.auth.isAuthenticated', request.auth);
                if (request.auth.isAuthenticated) {
                    reply.view('index');
                } else {
                    reply.view('login')
                }

            },
            description: 'Login'
        }
    },

    {
        method: 'GET',
        path: '/articles',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: fetchAllArticles,
            description: 'Gets all articles'
        }
    },
    {
        method: 'GET',
        path: '/articles/{source_id}',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: fetchOneArticles,
            description: 'Gets all articles'
        }
    },

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

]

module.exports = articlesRoute;