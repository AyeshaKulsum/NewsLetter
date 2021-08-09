
export const subscribe = (subscribe) => {
    return fetch(`/subscribe`, {
        method: 'POST',
        body: JSON.stringify(subscribe)
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
}

export const unsubscribe = (source_id) => {
    return fetch(`/unsubscribe`, {
        method: 'POST',
        body: JSON.stringify({ source_id })
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
}

export const fetchSourcesToSubscribe = () => {
    return fetch(`/sources`, {
        method: 'GET'
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
}


export const fetchAllArticlesOfUser = () => {
    console.log('here');
    return fetch(`/articles`, {
        method: 'GET'
    })
}

export const fetchArticlesBySourceId = (source_id) => {
    return fetch(`/articles/${source_id}`, {
        method: 'GET'
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
}
