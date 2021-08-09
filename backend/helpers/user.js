const User = require("../model/user");

const Session = require("../model/session");
const Article = require("../model/article");
const { QueryTypes } = require("sequelize");

const logoutHelper = async (request) => {
    try {
        console.log(request.auth.credentials);
        let { id } = request.auth.credentials;
        console.log(id);
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

        return { message: '', err, status: 'error' }
    }
}


const signupHelper = async (request) => {
    try {
        const { userName, email, password } = request.payload
        let user = await User.create({ userName, email, password })
        let response = {
            status: 'success',
            user
        }
        return response;
    }
    catch (err) {

        return { message: 'Unable to Sign up', err, status: 'error' }
    }

}




const loginHelper = async (request) => {
    try {
        const { email, password } = request.payload;
        const user = await User.findOne({
            where: {
                email,
                password
            }
        })

        console.log(user);

        if (user !== null) {
            let response = {
                status: 'success',
                user
            }
            return response;
        }
        // console.log(request, 'request')
        return null;
    }
    catch (err) {

        return { message: '', err, status: 'error' }
    }




}

const fetchArticleseHelper = async (request) => {
    try {
        const { user_id } = request.auth.credentials
        const result = await Article.sequelize.query(
            "select usm.source_id,s.\"FeedUrl\",s.\"Link\",s.\"Title\",a.\"Title\" as article_title,a.\"Link\" as article_link,a.\"Author\",a.\"Content\",a.\"ContentSnippet\",a.\"PubDate\",s.\"LastBuildDate\" from \"Users\" u inner join \"UserSourceMappings\" usm on usm.user_id=u.id inner join \"Sources\" s on s.id=usm.source_id inner join \"Articles\" a on a.source_id=s.id where u.id=:user_id and usm.\"deletedAt\" is null and s.\"deletedAt\" is null and a.\"deletedAt\" is null",
            {
                type: QueryTypes.SELECT,
                replacements: { user_id }

            }
        );
        return result;
    }
    catch (err) {
        console.log(err);
        return { message: 'No articles found', err, status: 'error' }
    }
}
module.exports = { signupHelper, loginHelper, logoutHelper, fetchArticleseHelper }