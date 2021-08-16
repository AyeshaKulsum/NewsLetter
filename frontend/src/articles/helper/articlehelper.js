
export const subscribe = (subscribe) => {
    return fetch(`/subscribe`, {
        method: 'POST',
        body: JSON.stringify(subscribe)
    })
}

export const unsubscribe = (source_id) => {
    return fetch(`/unsubscribe`, {
        method: 'POST',
        body: JSON.stringify({ source_id })
    })
}

export const fetchSourcesToSubscribe = () => {
    return fetch(`/sources`, {
        method: 'GET'
    })
}


export const fetchAllArticlesOfUser = () => {
    return fetch(`/articles`, {
        method: 'GET'
    })
}

export const fetchArticlesBySourceId = (source_id) => {
    return fetch(`/articles/${source_id}`, {
        method: 'GET'
    })
}



export const fetchAllSourcesDB = () => {
    return fetch(`/fetch-all-sources`, {
        method: 'GET'
    })
}
