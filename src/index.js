import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Routes from './views'
import './style/common.scss'

function getInitStyle() {
    const clientWidth = window.document.documentElement.clientWidth
    let width
    if (clientWidth < 500) {
        width = clientWidth
    } else if (clientWidth <= 1440) {
        width = 375 * (clientWidth / 1440)
    } else {
        width = 375
    }
    document.documentElement.style.fontSize = `${width / 3.75}px`
}

getInitStyle()

window.addEventListener('resize', getInitStyle)

const render = (Routes) => {
    ReactDOM.render(
        <AppContainer>
            <Routes />
        </AppContainer>,
        document.getElementById('app')
    )
}

render(Routes)

if (module.hot) {
    module.hot.accept('./views', () => render(Routes))
}
