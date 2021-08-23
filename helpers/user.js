const User = require("../model/user");

const Session = require("../model/session");
const Article = require("../model/article");
const { Op, Sequelize } = require("sequelize");
const UserSourceMapping = require("../model/usersourcemapping");
const Source = require("../model/source");
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

const fetchArticleseHelper = async (request) => {
    try {
        const { user_id } = request.auth.credentials
        let sourceids = [... (await UserSourceMapping.findAll({
            where: {
                user_id
            },
            raw: true,
            attributes: ['source_id']
        }))].map(sources => sources.source_id);
        let result = await Article.findAll({
            where: { source_id: sourceids },
            raw: true,
            include: [{
                model: Source,
                attributes: [],
                required: true
            }],
            order: [['PubDate', 'DESC']],
            attributes: ['source_id', ['Title', 'article_title'], ['Link', 'article_link'], ['Author', 'Author'], ['Content', 'Content'], ['ContentSnippet', 'ContentSnippet'], ['PubDate', 'PubDate'],
                [Sequelize.col('Source.FeedUrl'), 'FeedUrl'], [Sequelize.col('Source.Link'), 'Link']
                , [Sequelize.col('Source.Title'), 'Title'], [Sequelize.col('Source.LastBuildDate'), 'LastBuildDate']]
        })

        let response = {
            status: SUCCESS,
            result
        }
        return response;
    }
    catch (err) {
        return { message: 'No articles found', err, status: ERROR }
    }
}
module.exports = { signupHelper, loginHelper, logoutHelper, fetchArticleseHelper, googleAuthHelper }