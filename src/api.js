import axios from "axios";
import router from "./router/index.js";

const api = axios.create()

// start request
api.interceptors.request.use(config => {

    if (localStorage.getItem('access_token')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }

    return config
}, error => {

})

//end request
api.interceptors.response.use(config => {
    if (localStorage.getItem('access_token')) {
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }

    return config
}, error => {
    if (error.response.data.message === 'Token has expired') {
        return axios.post('http://79.174.91.91:81/api/refresh', {}, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => {
                localStorage.setItem('access_token', res.data.access_token)

                error.config.headers.authorization = `Bearer ${res.data.access_token}`

                return api.request(error.config)
            })
    }
    if (error.response.status === 401) {
        router.push({name: 'user.login'})
    }
})

export default api
