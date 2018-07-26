import api from './axios'

const G = {
    api,
    uid: 1, // 暂时给默认值 实际为后端返回
    userName: 'jason' // 暂时给默认值 实际为后端返回
}

window.G = G
