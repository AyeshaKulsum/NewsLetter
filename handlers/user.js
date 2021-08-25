
const { signupHelper, loginHelper, logoutHelper, googleAuthHelper } = require('../helpers/user');
const { subscribeHelper, unsubscribeHelper, profileHelper } = require('../helpers/sources');
const Session = require('../model/session');
const { uuid } = require('uuidv4');
const { ERROR, SUCCESS, INTERNAL_SERVER_ERROR_CODE } = require('../constants');

exports.signup = async (request, reply) => {
    try {
        let signup = await signupHelper(request);
        if (signup && signup.status === SUCCESS) {
            sessionHelper(request, reply, signup.result.id, '/');
        } else {
            reply({
                "status": ERROR,
                'message': "Internal Error"
            }).code(INTERNAL_SERVER_ERROR_CODE)
        }

    }
    catch (err) {
        reply({ message: 'signup error', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}

exports.googleAuth = async (request, reply) => {
    try {
        let googleAuth = await googleAuthHelper(request);
        if (googleAuth && googleAuth.status === SUCCESS) {
            sessionHelper(request, reply, googleAuth.result.id, '/', googleAuth.token);
        } else {
            reply.view('login', {
                "status": ERROR,
                'message': "There was an issue with the Google authentication."
            }).code(400)
        }

    }
    catch (err) {
        reply({ message: 'Unable to Google Authentication', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}

const sessionHelper = async (request, reply, id, path, token) => {
    Session.create({
        access_token: token ? token : uuid(),
        user_id: id
    }).then(session_data => {
        const data = {
            id: session_data.id,
            user_id: id
        }
        request.cookieAuth.set(data);
        reply.redirect(path).state('session', { loggedIn: true });
    })
}

exports.login = async (request, reply) => {
    try {
        let login = await loginHelper(request);
        if (login && login.status === SUCCESS) {
            sessionHelper(request, reply, login.result.id, '/');
        } else {
            reply({
                "status": ERROR,
                "message": "Unable to login"
            }).code(INTERNAL_SERVER_ERROR_CODE)
        }

    }
    catch (err) {
        reply({ message: 'Unable to login', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}


exports.subscribe = async (request, reply) => {
    try {
        let subscribe = await subscribeHelper(request);
        if (subscribe) {
            reply(subscribe)
        } else {
            reply({
                "status": ERROR,
                'message': "Internal Error"
            })
        }

    }
    catch (err) {
        reply({ message: 'subscribe error', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}

exports.unsubscribe = async (request, reply) => {
    try {
        let unsubscribe = await unsubscribeHelper(request);
        if (unsubscribe) {
            reply(unsubscribe)
        } else {
            reply({
                "status": ERROR,
                'message': "Internal Error"
            })
        }

    }
    catch (err) {
        reply({ message: 'unsubscribe error', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}


exports.profile = async (request, reply) => {
    try {
        let profile = await profileHelper(request);
        reply(profile)
    }
    catch (err) {
        reply({ message: 'profile error', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}


exports.logout = async (request, reply) => {
    try {
        let logout = await logoutHelper(request);
        if (logout) {
            reply.redirect('/').unstate("session")
        }

    }
    catch (err) {
        reply({ message: 'logout error', err, status: ERROR }).code(INTERNAL_SERVER_ERROR_CODE)
    }
}
