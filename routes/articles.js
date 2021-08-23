const { fetchAllArticles, fetchOneArticles, searchArticles } = require('../handlers/articles')

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
                if (request.auth.isAuthenticated) {
                    reply.view('index');
                } else {
                    reply.redirect('/login')
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
        method: 'POST',
        path: '/articles/search',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: searchArticles,
            description: 'Fetch articles by search'
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
        path: '/fetch-article/{source_id}',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,

            handler: (request, reply) => {
                reply.view('index')
            },
            description: 'Get articles'
        }
    },


]

module.exports = articlesRoute;