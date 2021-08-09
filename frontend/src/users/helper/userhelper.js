import Cookies from 'js-cookie';
export const signup = (user) => {
    return fetch(`/signup`, {
        method: 'POST',
        body: JSON.stringify(user)
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
}

export const login = (user) => {
    return fetch(`/login`, {
        method: 'POST',
        body: JSON.stringify(user)
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
}

export const profile = () => {
    console.log('here');
    return fetch(`/profile`, {
        method: 'GET'
    })
}


export const logout = () => {
    return fetch(`/logout`, {
        method: 'GET'
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const isAutheticated = () => {
    console.log('auth', Cookies);
    if (typeof window == "undefined") {
        return false;
    }
    if (getCookie('sid')) {
        return JSON.parse(getCookie('sid'));
    } else {
        return false;
    }
};