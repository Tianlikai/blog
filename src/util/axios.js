import axios from 'axios'
import api from '../settings/api'

for (let key in api) {
    api[key] = fetch.bind(null, api[key])
}
const Axios = axios.create({
    baseURL: 'api',
    timeout: 30000,
    withCredentials: false,
    responseType: '',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

Axios.interceptors.request.use(config => {
    let token = G.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    console.log('【Axios.interceptors.request】error.data.error.message:' + error.data.error.message, 3)
})

function fetch(options, urlOptions) {
    options = Object.assign({}, options, urlOptions)
    if (options.urlParams) {
        options.url = replaceParams(options.url, options.urlParams)
    }
    return new Promise((resolve, reject) => {
        Axios(options).then(response => {
            const {code, data} = response.data

            if (code === '0' && data) {
                resolve(data)
            } else if (code && code !== '0') {
                reject(response.data)
            } else {
                resolve(response.data)
            }
            // console.log('axios data', data)
        }).catch(e => {
            console.error('error', e)
            if (e.response.status === 401) {
                // Storage.del('token')
                G.gotoSignIn()
            }
            reject(e.response.data)
        })
    })
}

function replaceParams(url, urlParams) {
    let urlReplaceKeys = getMathKeys(url, [])

    for (let i = 0; i < urlReplaceKeys.length; i++) {
        let key = urlReplaceKeys[i]

        url = url.replace('{' + key + '}', urlParams[key])
    }

    return url
}

function getMathKeys(url, matchKeys) {
    let reg = /\{(\w+)\}/g
    let urlReplaceKeys = reg.exec(url)
    while (urlReplaceKeys) {
        matchKeys.push(urlReplaceKeys[1])
        urlReplaceKeys = reg.exec(url)
    }

    return matchKeys
}

export default api
