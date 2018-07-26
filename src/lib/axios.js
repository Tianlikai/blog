import axios from 'axios'
import api from './api'

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
            const {code, data, message} = response.data
            if (code === 0 && data) {
                resolve(data)
            } else if (code && code !== 0) {
                // 可以在此处对后端非正长返回 进行统一处理（注释掉reject函数 直接写容错处理函数）
                // 如需要返回则通过options传入参数进行判断
                reject(message)
            } else {
                resolve(response.data)
            }
        }).catch(e => {
            console.error('error', e)
            if (e.response.status === 401) {
                // G.gotoSignIn()
                alert('find me by copy whole this message 401')
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
