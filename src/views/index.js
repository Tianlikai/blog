import React from 'react'
import Container from '../layouts/Container'
import Home from './home'
import Detail from './detail'
import Create from './create'
import history from '../util/history'

import {
    Router,
    Route,
    Switch
} from 'react-router-dom'

class App extends React.PureComponent {
    render() {
        const style = {height: '100%'}
        return (
            <Container>
                <Router history={history}>
                    <div style={style}>
                        <Switch>
                            <Route path='/detail/:id' component={Detail} />
                            <Route path='/editor/new' component={Create} />
                            <Route path='/' exact component={Home} />
                        </Switch>
                    </div>
                </Router>
            </Container>
        )
    }
}

export default App
