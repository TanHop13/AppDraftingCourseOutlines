import axios from "axios";

// const HOST = 'https://tanhop.pythonanywhere.com'
const HOST = 'https://af64-2402-800-63b6-ef39-74bf-a233-81fc-aee0.ngrok-free.app'

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
    'change-info': (userid) => `/users/${userid}`,
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