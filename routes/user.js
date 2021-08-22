const { signup, login, logout, subscribe, unsubscribe, profile, googleAuth } = require('../handlers/user')
const { signupValidation, loginValidation, subscribeValidation, unsubscribeValidation } = require('../validations/articles')



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
            validate: signupValidation,
            description: 'Sign Up User'
        }
    },

    {
        method: 'POST',
        path: '/login',
        config: {
            handler: login,
            validate: loginValidation,
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
            validate: subscribeValidation,
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
            validate: unsubscribeValidation,
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




    {
        method: 'GET',
        path: '/login',
        config: {
            handler: (request, reply) => {
                reply.view('index')
            },

            description: 'Sign In User'
        }
    },

    {
        method: 'GET',
        path: '/userprofile',
        config: {
            handler: (request, reply) => {
                reply.view('index')
            },

            description: 'User Profile'
        }
    },

    {
        method: 'GET',
        path: '/signup',
        config: {
            handler: (request, reply) => {
                reply.view('index')
            },

            description: 'Sign Up'
        }
    },

    {
        method: 'GET',
        path: '/user-profile',
        config: {
            handler: (request, reply) => {
                reply.view('index')
            },

            description: 'Profile'
        }
    },


    {
        method: 'GET',
        path: '/user-subscribe',
        config: {
            handler: (request, reply) => {
                reply.view('index')
            },

            description: 'Subscribe'
        }
    },

    {
        method: "GET",
        path: "/auth/google",
        config: {
            auth: {
                strategy: 'google',
            },
            handler: googleAuth
        }
    }

]

module.exports = userRoute