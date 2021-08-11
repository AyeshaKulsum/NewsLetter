import { fetchAllArticlesOfUser, fetchAllSourcesDB, fetchSourcesToSubscribe } from "../../articles/helper/articlehelper"
import { profile } from "../../users/helper/userhelper"
import ACTIONS from "./actionsList"

export const fetchErrorMessage = data => {
    return {
        type: ACTIONS.ERROR_MESSAGE,
        payload: data
    }
}

export const fetchSuccessMessage = data => {
    return {
        type: ACTIONS.SUCCESS_MESSAGE,
        payload: data
    }
}

export const fetchArticles = data => {
    return {
        type: ACTIONS.ARTICLES,
        payload: data
    }
}




export const fetchSources = data => {
    return {
        type: ACTIONS.SOURCES,
        payload: data
    }
}



export const fetchAllSources = data => {
    return {
        type: ACTIONS.ALL_SOURCES,
        payload: data
    }
}

export const fetchUserDetails = data => {
    return {
        type: ACTIONS.FETCH_USER_DETAILS,
        payload: data
    }
}

export const fetchArticlesFromServer = () => {
    return dispatch => {
        fetchAllArticlesOfUser().then(async articles => {
            let a = await articles.json();
            if (a.status === 'error') {
                dispatch(errorFlag(true));
                dispatch(fetchErrorMessage(a.message));
            }
            else {
                dispatch(fetchErrorMessage(''));
                dispatch(fetchSuccessMessage(''));
                dispatch(fetchArticles(a.result));

            }
        }).catch(err => {
            dispatch(fetchErrorMessage(err.message));
        }
        )

    }
}

export const profileFromServer = () => {
    return dispatch => {
        profile().then(async response => {
            let result = await response.json();
            if (result.status === 'error') {
                dispatch(fetchErrorMessage(result.message));
            }
            else {
                dispatch(fetchErrorMessage(''));
                dispatch(fetchSuccessMessage(''));
                dispatch(fetchUserDetails(result.result));

            }
        }).catch(err => {
            dispatch(fetchErrorMessage(err.message));
        }
        )

    }
}

export const loginSuccess = () => {
    return {
        type: "LOGIN"
    }
}

export const logoutSuccess = () => {
    return {
        type: "LOGOUT"
    }
}

export const fetchSourcesToSubscribeFromServer = () => {
    return dispatch => {
        fetchSourcesToSubscribe().then(async sources => {
            let s = await sources.json();
            if (s.status === 'error') {
                dispatch(fetchErrorMessage(s.message));
            }
            else {
                dispatch(fetchErrorMessage(''));
                dispatch(fetchSuccessMessage(''));
                dispatch(fetchSources(s.result));

            }
        }).catch(err => {
            dispatch(fetchErrorMessage(err.message));
        }
        )

    }
}

export const fetchAllSourcesFromServer = () => {
    return dispatch => {
        fetchAllSourcesDB().then(async sources => {
            let s = await sources.json();
            if (s.status === 'error') {
                dispatch(fetchErrorMessage(s.message));
            }
            else {
                dispatch(fetchErrorMessage(''));
                dispatch(fetchSuccessMessage(''));
                dispatch(fetchAllSources(s.result));

            }
        }).catch(err => {
            dispatch(fetchErrorMessage(err.message));
        }
        )

    }
}