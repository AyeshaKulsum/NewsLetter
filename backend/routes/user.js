const { signup, login, logout, subscribe, unsubscribe, profile } = require('../handlers/user')



const AuthConfig = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        }
    }
}

const userRoute = [

    {
        method: 'POST',
        path: '/signup',
        config: {
            handler: signup,
            description: 'Sign Up User'
        }
    },

    {
        method: 'POST',
        path: '/login',
        config: {
            handler: login,
            description: 'Sign In User'
        }
    },

    {
        method: 'GET',
        path: '/logout',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: logout,
            description: 'Logout user'
        }
    },

    {
        method: 'POST',
        path: '/subscribe',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: subscribe,
            description: 'Subscribe'
        }
    },

    {
        method: 'POST',
        path: '/unsubscribe',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: unsubscribe,
            description: 'UnSubscribe'
        }
    },
    {
        method: 'GET',
        path: '/profile',
        config: {
            auth: AuthConfig.auth,
            plugins: AuthConfig.plugins,
            handler: profile,
            description: 'profile'
        }
    },
]

module.exports = userRoute