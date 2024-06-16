import axios from "axios";

// const HOST = 'https://tanhop.pythonanywhere.com'
const HOST = 'https://8033-1-52-16-219.ngrok-free.app'

export const endpoints = {
    'courses': '/courses/',
    'outlines': '/outlinesList/',
    'getcomments': (outlineid) => `/outlinesList/${outlineid}/comments/`,
    'createcomments': (outlineid) => `/outlinesCreate/${outlineid}/comments/`,
    'subjects': '/subjectsList/',
    // 'login': '/o/token/',
    'login': '/users/login/',
    'register': '/users/',
    'user': '/users/',
    'current-user': '/users/current-user/',
    'change-info': '/users/update-info',
    'delete-user': (userid) => `/users/${userid})/`
}

export const authAPI = (token) => {
    return axios.create({
        baseURL: HOST,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: HOST
})