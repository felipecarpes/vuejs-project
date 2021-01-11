import Vue from 'vue';
import decode from 'jwt-decode'

var httpRequest = new XMLHttpRequest();

const REST_ENDPOINT = '/'
const AUTH_TOKEN_KEY = 'authToken'

export function loginUser(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            var xhr = new XMLHttpRequest();
            var data = JSON.stringify([username, password]);

            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const responseContent = JSON.parse(this.responseText)
                    setAuthToken(responseContent.result)
                    resolve()
                }
            };
            
            xhr.open("POST", REST_ENDPOINT);
            xhr.send(data);
        }
        catch (err) {
            console.error('Caught an error during login:', err)
            reject(err)
        }
    })
}

export function logoutUser() {
    clearAuthToken()
    window.location.href= "/"
}

export function setAuthToken(token) {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
    return sessionStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
    sessionStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    if(!authToken) return window.location.href = "/"
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}