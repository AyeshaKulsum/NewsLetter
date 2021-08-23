const User = require("../model/user");
const Session = require("../model/session");
const { ERROR, SUCCESS } = require("../constants");


const logoutHelper = async (request) => {
    try {
        let { id } = request.auth.credentials;
        Session.destroy({
            where: {
                id
            }
        }).then(data => {
            request.cookieAuth.clear()
        })
        request.cookieAuth.clear()
        return true;
    }
    catch (err) {

        return { message: 'Failed to logout', err, status: ERROR }
    }
}


const signupHelper = async (request) => {
    try {
        const { userName, email, password } = request.payload;
        let user = await User.create({ userName, email, password, strategy: 'app' })

        if (user !== null) {
            let result = {
                email: user.email,
                userName: user.userName,
                id: user.id
            }
            let response = {
                status: SUCCESS,
                result
            }
            return response;
        }
        return null;
    }
    catch (err) {

        return { message: 'Unable to Sign up', err, status: ERROR }
    }

}

const googleAuthHelper = async (request) => {
    try {
        let result = null;
        if (request.auth.isAuthenticated) {
            const user = request.auth.credentials.profile
            result = await User.findOne({
                where: {
                    email: user.email
                }
            })
            console.log('res2', result);
            if (!result) {

                result = await User.create({ userName: user.displayName, email: user.email, password: 'GOOGLE_LOGIN', strategy: 'google' })
                console.log('res266788', result);

            }
            let response = {
                status: SUCCESS,
                result,
                token: request.auth.credentials.token
            }
            return response;
        }
        return null;

    }
    catch (err) {
        console.log(err);
        return { message: 'Unable to do Google Authentication', err, status: ERROR }
    }

}

const loginHelper = async (request) => {
    try {
        const { email, password } = request.payload;

        const user = await User.findOne({
            where: {
                email
            }
        })
        console.log(user);
        if (user && user.validPassword(password)) {
            if (user.strategy === 'google') {
                return { message: 'Google Auth failed', status: ERROR }
            }
            let result = {
                email: user.email,
                userName: user.userName,
                id: user.id
            }
            let response = {
                status: SUCCESS,
                result
            }
            return response;
        }
        return null;
    }
    catch (err) {

        return { message: 'Unable to login', err, status: ERROR }
    }
}


module.exports = { signupHelper, loginHelper, logoutHelper, googleAuthHelper }