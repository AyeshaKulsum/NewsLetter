
let Parser = require('rss-parser');

let parser = new Parser();


// user subscribe if already doesnt exists in db add all articles then subscribe else just subscribe
// unsubscribed sources to subscribe
// user should be able to sources to subscribe

// user should able to see subscribed articles in home page
// user profile with subscribed sources



const fetchAllArticlesHelper = async (request) => {
    try {
        console.log(request.payload);
        let articles = await parser.parseURL('http://blog.chromium.org/atom.xml');
        return articles;
    }
    catch (err) {

        return { message: 'No Articles found', err, status: 'error' }
    }

}



module.exports = { fetchAllArticlesHelper }