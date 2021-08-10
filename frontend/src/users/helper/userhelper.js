
export const signup = (user) => {
    return fetch(`/signup`, {
        method: 'POST',
        body: JSON.stringify(user)
    })
}

export const login = (user) => {
    return fetch(`/login`, {
        method: 'POST',
        body: JSON.stringify(user)
    })
}

export const profile = () => {

    return fetch(`/profile`, {
        method: 'GET'
    })
}


export const logout = () => {
    return fetch(`/logout`, {
        method: 'GET'
    })
}


export const isAutheticated = () => {
    let cookie = document.cookie;
    let value;
    if (cookie.length > 0) {
        value = JSON.parse(atob(document.cookie.split("=")[1])).loggedIn;
    }
    if (typeof window == "undefined") {
        return false;
    }
    if (value) {
        return value;
    } else {
        return false;
    }
};