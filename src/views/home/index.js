import React from 'react'
import NavigationBar from '../../layouts/NavigationBar'
import Posts from './posts'
import './style.scss'

let lastPosition = 0

export default class About extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showNavBar: false
        }
    }
    render() {
        return (
            <div className='home' ref={ref => { this.home = ref }} onScroll={(e) => {
                const scrollTop = e.target.scrollTop
                if (lastPosition < scrollTop && !this.state.showNavBar) {
                    this.setState({showNavBar: true})
                } else if (lastPosition > scrollTop && scrollTop < 10 && this.state.showNavBar) {
                    this.setState({showNavBar: false})
                }
                if (scrollTop !== lastPosition) {
                    lastPosition = scrollTop
                }
            }}>
                <NavigationBar transparent={!this.state.showNavBar} path='/' />
                <Posts isShow />
            </div>
        )
    }
}
